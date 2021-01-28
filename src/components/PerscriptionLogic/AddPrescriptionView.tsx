import React, {useEffect} from 'react';
import {Formik, Field, Form } from "formik";
import {makeStyles} from '@material-ui/core/styles';
import {Button, Container, Typography, CssBaseline, TextField} from "@material-ui/core";
import * as yup from "yup";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";
import {
    DatePicker,
} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


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
    return(
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Nowa Recepta
                    </Typography>
                    <Formik initialValues={{
                        login: "",
                        email: "",
                        password: "",
                        password2: "",
                        date: new Date(),
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
                                    <Field component={DatePicker} name="date" label="Data wygaśnięcia" varint={"outlined"} />
                                    <Field placeholder={"Pesel pacjenta"} label={"Pesel pacjenta"} variant="outlined" margin="normal" name={"medicine"} type={"input"} as={TextFieldWrapper}/>
                                    <Field placeholder={"medicine"} label={"Nazwa Leku"} variant="outlined" margin="normal" name={"medicine"} type={"input"} as={TextFieldWrapper}/>
                                    <Field placeholder={"pwz"} label={"numer PWZ"}  variant="outlined" margin="normal" name={"pwz"} type={"input"} as={TextFieldWrapper}/>
                                    <Field placeholder={"doctorName"} label={"Imię i nazwisko lekarza"}  variant="outlined" margin="normal" name={"doctorName"} type={"input"} as={TextFieldWrapper}/>
                                    <Field placeholder={"quantity"} label={"Ilość"}  variant="outlined" margin="normal" name={"quantity"} type={"input"} as={TextFieldWrapper}/>
                                    {/*<Field placeholder={"description"}*/}
                                    {/*       label={"Description"}*/}
                                    {/*       variant="outlined"*/}
                                    {/*       margin="normal"*/}
                                    {/*       name={"description"}*/}
                                    {/*       type={"input"}*/}
                                    {/*       multiline*/}
                                    {/*       rows={3}*/}
                                    {/*       rowsMax={3}*/}
                                    {/*       as={TextFieldWrapper}/>*/}

                                    <TextField placeholder={"description"}
                                                      label={"Opis"}
                                                      variant="outlined"
                                                      margin="normal"
                                                      name={"description"}
                                                      type={"input"}
                                                      multiline
                                                      rows={3}
                                                      rowsMax={3}
                                                      fullWidth
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
export default AddPrescriptionView