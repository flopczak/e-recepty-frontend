import React from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Grid, Link, Typography, CssBaseline} from "@material-ui/core";
import * as yup from "yup";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import axios from "axios";



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

const Register = () => {
    const classes = useStyles();

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
                            axios.post('http://127.0.0.1:8000/api/user/register', {
                                username: data.login,
                                email: data.email,
                                password: data.password
                            }).then((response)=> {
                                console.log(response);
                            }).catch((error) => {
                                console.log(error);
                            })
                            setSubmitting(false)
                        }}
                >
                    {({values, handleSubmit, isSubmitting}) => (
                        <Form onSubmit={handleSubmit} className={classes.form}>
                            <Field placeholder={"login"} label={"Login"} variant="outlined" margin="normal" name={"login"} type={"input"} as={TextFieldWrapper}/>
                            <Field placeholder={"email"} label={"Email"}  variant="outlined" margin="normal" name={"email"} type={"input"} as={TextFieldWrapper}/>
                            <Field placeholder={"password"} label={"Password"} variant="outlined" margin="normal" name={"password"} type={"password"} as={TextFieldWrapper}/>
                            <Button className={classes.submit} disabled={isSubmitting} fullWidth variant="contained" color="primary" type={"submit"}>Sign In</Button>
                            <pre>
                            {JSON.stringify(values, null, 2)}
                        </pre>
                            <Grid container>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Already have an account? Sign In"}
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

export default Register;