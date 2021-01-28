import React from "react";
import {AddPrescriptionView, PrescriptionViewer} from "../index";
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RealisePrescription from "../PerscriptionLogic/RealisePrescription";
import PrescriptionDetails from "../PerscriptionLogic/PrescriptionDetails";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        alignItems: 'center',
        color: theme.palette.text.secondary,
    },
    dd:{
        marginTop: theme.spacing(5),
        padding: theme.spacing(2),
        alignItems: 'center',
        color: theme.palette.text.secondary,
    },
    add: {
        marginTop: theme.spacing(6),
    }
}));


const MainView = () => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container  alignItems="center" spacing={3}>
                <Grid item xs={12}>
                </Grid>
                <Grid item sm={6}>
                    <Paper className={classes.paper}>
                        <PrescriptionViewer/>
                    </Paper>
                    <Paper className={classes.dd}>
                        <RealisePrescription/>
                    </Paper>
                </Grid>
                <Grid className={classes.add} item sm={6}>
                    <Paper className={classes.paper}>
                        <AddPrescriptionView/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
export default MainView