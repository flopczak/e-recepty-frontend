import React from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Typography, CssBaseline, TextField} from "@material-ui/core";
import * as yup from "yup";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


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


const displaySearch = (classes) => {
    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Recepta do zrealizowania
                </Typography>
                <Formik initialValues={{
                    searchInfo: "",
                }}
                        validationSchema={validationSchema}
                        onSubmit={(data,{setSubmitting}) => {
                            setSubmitting(true)

                            setSubmitting(false)
                        }}
                >
                    {({values, handleSubmit, isSubmitting}) => (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Form onSubmit={handleSubmit} className={classes.form}>
                                <Field placeholder={"searchInfo"} label={"QR code"} variant="outlined" margin="normal" name={"searchinfo"} type={"input"} as={TextFieldWrapper}/>
                                <Button className={classes.submit} disabled={isSubmitting} fullWidth variant="contained" color="primary" type={"submit"}>Zrealizuj</Button>
                            </Form>
                        </MuiPickersUtilsProvider>
                    )}
                </Formik>
            </div>
        </Container>
    )
}

const RealisePrescription = (props: any) => {
    const classes = useStyles();
    return(
        <div>
            {displaySearch(classes)}
        </div>
    )
}
export default RealisePrescription