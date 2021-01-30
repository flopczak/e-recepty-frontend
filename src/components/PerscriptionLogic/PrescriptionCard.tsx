import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PrescriptionDetails, {PrescriptionDetailsProps} from "./PrescriptionDetails";
import axios from "axios";
import {connect} from 'react-redux';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    quantity :{
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
});

export interface ShortenPrescription {
    number: string,
    pesel: string,
    description: string,
    status: string,
    doctor: string,
    creationDate: string,
}
interface StoreProp{
    token: string
}



const PrescriptionCard = (props: ShortenPrescription & StoreProp ) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [percriptionDetail, setPrescriptionDetail] = useState();
    const date = new Date(parseInt(props.creationDate))

    const displayPercriptionDetails = () => {
        axios.get(`https://recepty.eu.ngrok.io/api/prescription/${props.number}`,{
            headers: {"Authorization" : `Bearer ${props.token}`}
        })
            .then((response) => {
                console.log(response)
                // const perscriptionDetails: PrescriptionDetailsProps = response.data;
                setPrescriptionDetail(response.data);
                setIsOpen(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleClose = () => {
        setIsOpen(false);
    }
//TODO zadecydować jakie dane wyswietlane
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.description}
                </Typography>
                <Typography className={classes.quantity}>
                    {props.doctor}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {date.toLocaleString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => displayPercriptionDetails()}>
                    Więcej Informacji
                </Button>
                <PrescriptionDetails isOpen={isOpen} handleClose={handleClose} {...percriptionDetail}/>
            </CardActions>
        </Card>
    );
}

const mapStateToProps = (state) => ({
    token: state.auth.token
});

export default connect(mapStateToProps)(PrescriptionCard);