import React from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Typography, CssBaseline, TextField} from "@material-ui/core";
import * as yup from "yup";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from "axios";
import {connect} from 'react-redux';
import {useHistory} from "react-router";
import CodeReader from "../QrCodeReader/CodeReader";

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


const RealisePrescription = (props: any) => {
    const classes = useStyles();
    const history = useHistory();
    return(
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Recepta do zrealizowania
                    </Typography>
                    <Formik initialValues={{
                        searchInfo: "",
                    }}
                            // validationSchema={validationSchema}
                            onSubmit={(data,{setSubmitting}) => {
                                setSubmitting(true)
                                axios.get(`https://recepty.eu.ngrok.io/api/prescription/${data.searchInfo}`,{
                                    headers: {"Authorization" : `Bearer ${props.token}`}
                                })
                                    .then((response) => {
                                        console.log(response)
                                        history.push({pathname: `/realisePrescription/${data.searchInfo}`, state: response.data} );
                                    })
                                    .catch((err) => {
                                        //TODO swall error
                                        console.log(err);
                                    })
                                setSubmitting(false)
                            }}
                    >
                        {({values, handleSubmit, isSubmitting}) => (
                                <Form onSubmit={handleSubmit} className={classes.form}>
                                    <Field placeholder={"searchInfo"} label={"QR code"} variant="outlined" margin="normal" name={"searchInfo"} type={"input"} as={TextFieldWrapper}/>
                                    <Button className={classes.submit} disabled={isSubmitting} fullWidth variant="contained" color="primary" type={"submit"}>Zrealizuj</Button>
                                </Form>
                        )}
                    </Formik>
                    <CodeReader />
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token
});
export default connect(mapStateToProps)(RealisePrescription)