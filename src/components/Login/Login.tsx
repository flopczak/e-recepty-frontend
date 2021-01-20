import React from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Grid, Link, Typography, CssBaseline} from "@material-ui/core";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import * as yup from "yup";

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
    email: yup.string().email().required(),
    password: yup.string().required()
})

const Login = () => {
    const classes = useStyles();

    return (
<Container component="main" maxWidth="xs">
    <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik initialValues={{login: "", email: "", password: ""}}
                    validationSchema={validationSchema}
                    onSubmit={(data,{setSubmitting}) => {
                        setSubmitting(true)
                        console.log("submit", data)
                        //here async call to backend

                        setSubmitting(false)
                    }}
            >
                {({values, handleSubmit, isSubmitting}) => (
                    <Form onSubmit={handleSubmit} className={classes.form}>
                        <Field placeholder={"login"} label={"Login"} variant="outlined" margin="normal" name={"login"} type={"input"} as={TextFieldWrapper}/>
                        <Field placeholder={"password"} label={"Password"} variant="outlined" margin="normal" name={"password"} type={"password"} as={TextFieldWrapper}/>
                            <Button className={classes.submit} disabled={isSubmitting} fullWidth variant="contained" color="primary" type={"submit"}>Sign In</Button>
                        <pre>
                            {/*{JSON.stringify(values, null, 2)}*/}
                        </pre>
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
    );
}
export default Login;