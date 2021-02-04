import React, {useEffect, useState} from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Typography, CssBaseline, TextField, Grid, IconButton} from "@material-ui/core";
import * as yup from "yup";
import Swal from "sweetalert2"
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import {
    DatePicker,
} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {connect} from 'react-redux';
import { sha256 } from "js-sha256";
import AddBoxIcon from '@material-ui/icons/AddBox';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
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
    login: yup.string().required().min(4).max(25),
    email: yup.string().email().required(),
    password: yup.string().required()
})

const AddPrescriptionView = (props: any) => {
    const classes = useStyles();
    const [leki, setLeki] = useState({medications:[{name:"", quantity:""}]})

    const addNewRow = () => {
        const values = [...leki.medications];
        values.push({
            name: "",
            quantity: ""
        })
        setLeki({medications: values});
    }

    const mapObject = (medications) =>{
       var arr = {};
        medications.map((medication) => {
            arr[medication.name]= parseInt(medication.quantity);
        })
        return arr
    }


    return(
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Nowa Recepta
                    </Typography>
                    <Formik initialValues={{
                        pesel: "",
                        pwz: "",
                        shortDescription: "",
                        description: "",
                        expiration: new Date(),
                        medications:[ {name: "", quantity: ""} ]
                    }}
                            // validationSchema={validationSchema}
                            onSubmit={(data,{setSubmitting, resetForm}) => {
                                setSubmitting(true)
                                const number = sha256(Date.now().toString());
                                const mapedMedicines = mapObject(data.medications);
                                const prescriptionObject = {...data,medications: mapedMedicines, createdDate: new Date().toISOString().substring(0,10) , expiration: data.expiration.toISOString().substring(0,10), number: number};
                                console.log(prescriptionObject)
                                axios.post(`https://recepty.eu.ngrok.io/api/doctor/prescription`, prescriptionObject,{
                                    headers: {"Authorization" : `Bearer ${props.token}`}
                                })
                                    .then((response) => {
                                        Swal.fire({
                                            title: "Sukces!",
                                            text: "Udało się dodać nową receptę.",
                                            icon: "success",
                                        })
                                        resetForm();
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                                setSubmitting(false)
                            }}
                    >
                        {({values, handleSubmit, isSubmitting}) => (
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Form onSubmit={handleSubmit} className={classes.form}>
                                    <Field component={DatePicker} name="expiration" label="Data wygaśnięcia" varint={"outlined"} />
                                    <Field placeholder={"Pesel pacjenta"} label={"Pesel pacjenta"} variant="outlined" margin="normal" name={"pesel"} type={"input"} as={TextFieldWrapper}/>
                                    <Field placeholder={"Krótki opis"} label={"Krótki opis"} variant="outlined" margin="normal" name={"shortDescription"} type={"input"} as={TextFieldWrapper}/>
                                    <IconButton color={"primary"} type="button" onClick={() => addNewRow()}>
                                        <AddBoxIcon/>
                                    </IconButton>
                                    {leki.medications.map((field, idx) => {
                                        return(
                                            <Grid container >
                                                <Grid item xs={6}>
                                                    <Field  key={`medications.${idx}.name`} placeholder={"Lek"} label={"Lek"} variant="outlined"
                                                           margin="normal" name={`medications.${idx}.name`} type={"input"} as={TextFieldWrapper}/>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Field  key={`medications.${idx}.quantity`} placeholder={"Ilość/liczba opakowań"} label={"Ilość/liczba opakowań"} variant="outlined"
                                                           margin="normal" name={`medications.${idx}.quantity`} type={"input"} as={TextFieldWrapper}/>
                                                </Grid>
                                            </Grid>
                                        );
                                    })}
                                    <Field placeholder={"Opis"}
                                           label={"Opis"}
                                           variant="outlined"
                                           margin="normal"
                                           name={"description"}
                                           type={"input"}
                                           multiline
                                           rows={3}
                                           rowsMax={3}
                                           fullWidth
                                           as={TextFieldWrapper}
                                    />
                                    <Button className={classes.submit} disabled={isSubmitting} fullWidth variant="contained" color="primary" type={"submit"}>Stwórz</Button>
                                </Form>
                            </MuiPickersUtilsProvider>
                        )}
                    </Formik>
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token
});

export default connect(mapStateToProps)(AddPrescriptionView);