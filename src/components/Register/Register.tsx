import React, {useEffect} from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Grid, Link, Typography, CssBaseline} from "@material-ui/core";
import {ErrorHandler} from "../index";
import * as yup from "yup";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import { connect } from "react-redux";
import { register } from "../../actions/auth"
import { clear } from "../../actions/errors"
import {Redirect, useHistory} from "react-router";
import { sha256 } from "js-sha256";



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
}));

//TODO poprawić walidacje
const validationSchema = yup.object().shape({
    login: yup.string()
        .required("Pole login nie może być puste")
        .min(4, "Pole login musi zawierać conajmniej 4 znaki")
        .max(15, "Pole login może zawierać maksymalnie 15 znaków"),
    password: yup.string().required("Pole hasło nie może być puste")
        .min(8, "Hasło musi zawierać conajmniej 8 znaków")
        .max(25, "Hasło może zawierać maksymalnie 25 znaków"),
        // .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, "Hasło musi zawierać conajmniej jedną wielką literę, jedną małą, jedną cyfrę oraz jeden znak specjalny"),
    email: yup.string().email().required(),
    password2: yup.string().required()
})

interface RegisterProps {
    register: any;
    clear: any;
    isAuthenticated?: boolean;
    errorMessage?: { error: string };
}

const isLoged = ( props: RegisterProps, classes, history) => {
    let passMatch = true;
    if (props.isAuthenticated) {
        return(
            <Redirect to="/#" />
        )
    } else {
        const msg = props.errorMessage?.error || "";
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Rejestracja
                    </Typography>
                    <Formik initialValues={{pwz: "", password: "", surname: "" , name:"" ,password2: ""}}
                            // validationSchema={validationSchema}
                            onSubmit={(data,{setSubmitting}) => {
                                setSubmitting(true)
                                if (data.password !== data.password2 ){
                                    passMatch = false;
                                } else {
                                    const pass =sha256(data.password)

                                    props.register({
                                        password: pass,
                                        pwz: data.pwz,
                                        name: `${data.name} ${data.surname}`})
                                }
                                setSubmitting(false)
                            }}
                    >
                        {({values, handleSubmit, isSubmitting}) => (
                            <Form onSubmit={handleSubmit} className={classes.form}>
                                <Field placeholder={"Imię"} label={"Imię"} variant="outlined" margin="normal" name={"name"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"Nazwisko"} label={"Nazwisko"} variant="outlined" margin="normal" name={"surname"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"PWZ"} label={"PWZ"} variant="outlined" margin="normal" name={"pwz"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"Hasło"} label={"Hasło"} variant="outlined" margin="normal" name={"password"} type={"password"} as={TextFieldWrapper}/>
                                <Field placeholder={"Potwierdź hasło"} label={"Potwierdź hasło"} variant="outlined" margin="normal" name={"password2"} type={"password"} as={TextFieldWrapper}/>
                                <ErrorHandler msg={msg}/>
                                {passMatch ? (<></>) : (
                                    <ErrorHandler msg={"Hasła różnią się"}/>
                                )}
                                <Button className={classes.submit} disabled={isSubmitting} fullWidth variant="contained" color="primary" type={"submit"}>Zarejstruj</Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/#/login" variant="body2">
                                            {"Posiadzasz już konto? Zaloguj się"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        )
    }
}


const Register = (props: RegisterProps) => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        props.clear()
    },[])
    return (
            isLoged(props, classes, history)
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.errors.msg
});

export default connect(mapStateToProps, { register, clear })(Register);