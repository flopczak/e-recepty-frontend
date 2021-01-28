import React, {useEffect} from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Grid, Link, Typography, CssBaseline} from "@material-ui/core";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { clear } from "../../actions/errors"
import * as yup from "yup";
import {Redirect} from "react-router";
import {ErrorHandler} from "../index";
import {sha256} from "js-sha256";

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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
}));

const validationSchema = yup.object().shape({
    login: yup.string()
                .required("Pole login nie może być puste")
                .min(4, "Pole login musi zawierać conajmniej 4 znaki")
                .max(15, "Pole login może zawierać maksymalnie 15 znaków"),
    password: yup.string().required("Pole hasło nie może być puste")
        .min(8, "Hasło musi zawierać conajmniej 8 znaków")
        .max(25, "Hasło może zawierać maksymalnie 25 znaków")
        // .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, "Hasło musi zawierać conajmniej jedną wielką literę, jedną małą, jedną cyfrę oraz jeden znak specjalny")
})

interface LoginProps {
    login: any;
    clear: any;
    isAuthenticated?: boolean;
    errorMessage?: { error: string };
}

const isLoged = ( props: LoginProps, classes) => {
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
                        Logowanie
                    </Typography>
                    <Formik initialValues={{pwz: "", password: ""}}
                            // validationSchema={validationSchema}
                            onSubmit={(data,{setSubmitting}) => {
                                setSubmitting(true)
                                const pass =sha256(data.password)

                                props.login(data.pwz, pass);
                                setSubmitting(false)
                            }}
                    >
                        {({values, handleSubmit, isSubmitting}) => (
                            <Form onSubmit={handleSubmit} className={classes.form}>
                                <Field placeholder={"PWZ"} label={"PWZ"} variant="outlined" margin="normal" name={"pwz"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"Hasło"} label={"Hasło"} variant="outlined" margin="normal" name={"password"} type={"password"} as={TextFieldWrapper}/>
                                <ErrorHandler msg={msg}/>
                                <Button className={classes.submit} disabled={isSubmitting} fullWidth variant="contained" color="primary" type={"submit"}>Zaloguj</Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Zapomniałeś hasła?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/#/register" variant="body2">
                                            {"Nie masz konta? Zarejestruj się"}
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

const Login = (props: LoginProps) => {
    const classes = useStyles();

    useEffect(() => {
        props.clear()
    }, [])

    return (
        isLoged(props, classes)
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.errors.msg,
});

export default connect(mapStateToProps,{ login, clear })(Login);