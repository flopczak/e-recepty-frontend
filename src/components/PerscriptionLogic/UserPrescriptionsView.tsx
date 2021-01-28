import React from "react";
import PrescriptionCard, {ShortenPrescription} from "./PrescriptionCard";
import Grid from '@material-ui/core/Grid';
import {Navbar} from "../index";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
    },
}));


const UserPrescriptionsView = (props) => {
    const prescriptions:ShortenPrescription[] = props.location.state.response.data;
    console.log(prescriptions)
    const classes = useStyles();
    return(
        <div>
            <Grid className={classes.paper} container  alignItems="center" spacing={3}>
                <Grid item xs={12}>
                    <h2>Pacjent: {prescriptions[0].pesel} </h2>
                </Grid>
                {prescriptions ? (
                    prescriptions.map((prescription) => {
                        return(
                            <Grid item xs={12} sm={3}>
                                <PrescriptionCard {...prescription}/>
                            </Grid>
                        )
                    })
                ) : (
                    <h1>Brak historii do wyświetlenia</h1>
                ) }
            </Grid>
        </div>
    );
}

export default UserPrescriptionsView;