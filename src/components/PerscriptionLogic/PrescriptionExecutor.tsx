import React, {useEffect, useState} from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Typography, CssBaseline, Grid} from "@material-ui/core";
import * as yup from "yup";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import IconButton from '@material-ui/core/IconButton';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBox from '@material-ui/icons/AddBox';
import {connect} from 'react-redux';
import axios from "axios";
import {useHistory} from "react-router";



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

//TODO walidacja tego < pozostałej ilosci
//TODO swal podczas sukcesu
const PrescriptionExecutor = (props: any) => {
    const classes = useStyles();
    const history = useHistory();
    const capturedState = props.location.state;
    const mapObject = () =>{
        const arr = capturedState.medications.map((medication) => {
            return ({...medication, amountRequested: 0})
        })
        return arr;
    }
    const state = {...capturedState, medications: mapObject()};

    const castStringsToNumbers = (medications) =>{
        return  medications.map((medication) => {
            return  ({name: medication.name ,amount: medication.amount ,active: medication.active ,amountLeft: medication.amountLeft - parseInt(medication.amountRequested)});
        })
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
                        pesel: state.pesel,
                        pwz: state.pwz,
                        shortDescription: state.shortDescription,
                        description: state.description,
                        expiration: state.expiration,
                        medications: state.medications
                    }}
                        // validationSchema={validationSchema}
                            onSubmit={(data,{setSubmitting}) => {
                                setSubmitting(true)
                                const returnObj = {...data,createdDate: capturedState.createdDate, number: capturedState.number, medications: castStringsToNumbers(data.medications)}
                                axios.put(`https://recepty.eu.ngrok.io/api/doctor/prescription/buy`, returnObj,{
                                    headers: {"Authorization" : `Bearer ${props.token}`}
                                })
                                    .then((response) => {
                                       history.push("/");
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                                setSubmitting(false)
                            }}
                    >
                        {({values, handleSubmit, isSubmitting}) => (
                            <Form onSubmit={handleSubmit} className={classes.form}>
                                {/*<Field component={DatePicker} disabled name="expiration" label="Data wygaśnięcia" varint={"outlined"} />*/}
                                <Field placeholder={"Data wygaśnięcia"} disabled label={"Data wygaśnięcia"} variant="outlined" margin="normal" name={"expiration"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"Pesel pacjenta"} disabled label={"Pesel pacjenta"} variant="outlined" margin="normal" name={"pesel"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"Numer PWZ"} disabled label={"Numer PWZ"}  variant="outlined" margin="normal" name={"pwz"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"Krótki opis"} disabled label={"Krótki opis"} variant="outlined" margin="normal" name={"shortDescription"} type={"input"} as={TextFieldWrapper}/>
                                <Field placeholder={"Imię i nazwisko lekarza"} disabled label={"Imię i nazwisko lekarza"}  variant="outlined" margin="normal" name={"doctorName"} type={"input"} as={TextFieldWrapper}/>
                                {capturedState.medications.map((field, idx) => {
                                    return(
                                        <Grid container >
                                            <Grid item xs={4}>
                                                <Field  key={`medications.${idx}.name`} disabled placeholder={"Lek"} label={"Lek"} variant="outlined"
                                                        margin="normal" name={`medications.${idx}.name`} type={"input"} as={TextFieldWrapper}/>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Field  key={`medications.${idx}.amountLeft`} disabled placeholder={"Pozostała ilość"} label={"Pozostała ilość"} variant="outlined"
                                                        margin="normal" name={`medications.${idx}.amountLeft`} type={"input"} as={TextFieldWrapper}/>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Grid alignItems={"center"} alignContent={'space-between'} container>
                                                    {/*<Grid item xs={2}>*/}
                                                    {/*    <IconButton  size={"small"} onClick={() => handleDecrement(idx)}>*/}
                                                    {/*        <IndeterminateCheckBoxIcon/>*/}
                                                    {/*    </IconButton>*/}
                                                    {/*</Grid>*/}
                                                    <Grid item xs={12}>
                                                        <Field  key={`medications.${idx}.amountRequested`}  placeholder={"Ilość"} label={"Ilość"} variant="outlined"
                                                                margin="normal" name={`medications.${idx}.amountRequested`} type={"input"} as={TextFieldWrapper}/>
                                                    </Grid>
                                                    {/*<Grid item xs={2}>*/}
                                                    {/*    <IconButton size={"small"} onClick={() => handleIncrement(idx)}>*/}
                                                    {/*        <AddBox/>*/}
                                                    {/*    </IconButton>*/}

                                                    {/*</Grid>*/}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                                <Field placeholder={"Opis"}
                                       label={"Opis"}
                                       disabled
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

export default connect(mapStateToProps)(PrescriptionExecutor);