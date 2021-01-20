import React from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Grid, Link, Typography, CssBaseline} from "@material-ui/core";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import { connect, getState } from "react-redux";
import { login } from "../../actions/auth"
import * as yup from "yup";
import {Redirect} from "react-router";

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
    },
}));

const validationSchema = yup.object().shape({
    login: yup.string().required().min(4).max(25),
    password: yup.string().required()
})

interface LoginProps {
    login: any;
    isAuthenticated?: boolean;
}

const isLoged = ( props: LoginProps, classes) => {
    if (props.isAuthenticated) {
        return(
            <Redirect to="/#" />
        )
    } else {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Formik initialValues={{login: "", password: ""}}
                            validationSchema={validationSchema}
                            onSubmit={(data,{setSubmitting}) => {
                                setSubmitting(true)
                                console.log("submit", data)
                                //here async call to backend
                                props.login(data.login,data.password);

                                setSubmitting(false)
                            }}
                    >
                        {({values, handleSubmit, isSubmitting}) => (
                            <Form onSubmit={handleSubmit} className={classes.form}>
                                <Field placeholder={"login"} label={"Login"} variant="outlined" margin="normal" name={"login"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"password"} label={"Password"} variant="outlined" margin="normal" name={"password"} type={"password"} as={TextFieldWrapper}/>
                                <Button className={classes.submit} disabled={isSubmitting} fullWidth variant="contained" color="primary" type={"submit"}>Sign In</Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/#/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
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
    return (
        isLoged(props, classes)
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps,{ login })(Login);