import React from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Typography, CssBaseline} from "@material-ui/core";
import * as yup from "yup";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import {useHistory} from "react-router";
import axios from "axios";
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
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

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
}));


const validationSchema = yup.object().shape({
    searchInfo: yup.string().required().min(4).max(25),
})


const displaySearch = (classes, history, token) => {
    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Historia recept pacjenta
                </Typography>
                <Formik initialValues={{
                    searchInfo: "",
                }}
                        validationSchema={validationSchema}
                        onSubmit={(data,{setSubmitting}) => {
                            setSubmitting(true)
                                axios.get(`https://recepty.eu.ngrok.io/api/doctor/patient/${data.searchInfo}`,{
                                    headers: {"Authorization" : `Bearer ${token}`}
                                })
                                    .then((response) => {
                                        console.log(response)
                                        history.push({ pathname:`/user/${data.searchInfo}`, state:{ response }})
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            setSubmitting(false)
                        }}
                >
                    {({values, handleSubmit, isSubmitting}) => (
                            <Form onSubmit={handleSubmit} className={classes.form}>
                                <Field placeholder={"Pesel pacjenta"} label={"Pesel pacjenta"} variant="outlined" margin="normal" name={"searchInfo"} type={"input"} as={TextFieldWrapper}/>
                                <Button className={classes.submit} disabled={isSubmitting} fullWidth variant="contained" color="primary" type={"submit"}>Wyszukaj</Button>
                            </Form>
                    )}
                </Formik>
            </div>
        </Container>
    )
}

const PatientHistorySearch = (props: any) => {
    const classes = useStyles();
    const history = useHistory();
    const token = props.token;
    return(
        <div>
            {displaySearch(classes, history, token)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token
});

export default connect(mapStateToProps)(PatientHistorySearch);