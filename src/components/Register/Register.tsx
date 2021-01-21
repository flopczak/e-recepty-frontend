import React from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Grid, Link, Typography, CssBaseline} from "@material-ui/core";
import {ErrorHandler} from "../index";
import * as yup from "yup";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import { connect } from "react-redux";
import { register } from "../../actions/auth"
import { clear } from "../../actions/errors"
import {Redirect} from "react-router";
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

const validationSchema = yup.object().shape({
    login: yup.string().required().min(4).max(25),
    email: yup.string().email().required(),
    password: yup.string().required()
})

interface RegisterProps {
    register: any;
    clear: any;
    isAuthenticated?: boolean;
    errorMessage?: { error: string };
}

const isLoged = ( props: RegisterProps, classes) => {
    if (props.isAuthenticated) {
        props.clear()
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
                        Sign Up
                    </Typography>
                    <Formik initialValues={{login: "", email: "", password: ""}}
                            validationSchema={validationSchema}
                            onSubmit={(data,{setSubmitting}) => {
                                setSubmitting(true)
                                const pass =sha256(data.password)

                                props.register({
                                    login: data.login,
                                    password: pass,
                                    email: data.email})
                                setSubmitting(false)
                            }}
                    >
                        {({values, handleSubmit, isSubmitting}) => (
                            <Form onSubmit={handleSubmit} className={classes.form}>
                                <Field placeholder={"login"} label={"Login"} variant="outlined" margin="normal" name={"login"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"email"} label={"Email"}  variant="outlined" margin="normal" name={"email"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"password"} label={"Password"} variant="outlined" margin="normal" name={"password"} type={"password"} as={TextFieldWrapper}/>
                                <ErrorHandler msg={msg}/>
                                <Button className={classes.submit} disabled={isSubmitting} fullWidth variant="contained" color="primary" type={"submit"}>Sign Up</Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="/#/login" variant="body2">
                                            {"Already have an account? Sign In"}
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
    return (
            isLoged(props, classes)
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.errors.msg
});

export default connect(mapStateToProps, { register, clear })(Register);