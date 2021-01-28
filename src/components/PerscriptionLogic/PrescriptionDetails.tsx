import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Modal, Typography} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import Grid from '@material-ui/core/Grid';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 ;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export interface  PrescriptionDetailsProps {
    isOpen: boolean,
    handleClose: () => void;
    number: number,
    pesel: string,
    createdDate: string,
    expiration: string,
    status: string,
    medications: Medication[],
    description: string,
    shortDescription: string,
    creator: string,
}

interface Medication {
    name: string,
    amount: number,
    amountLeft: number,
    active:boolean,
}


const PrescriptionDetails = (props: PrescriptionDetailsProps) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);



    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Grid container alignItems={"center"} spacing={3}>
                    <Grid item sm={6}>
                        <List>
                            <ListItem alignItems={"center"}>
                                <ListItemText primary={"Pesel pacjenta"} secondary={props.pesel} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Osoba tworząca"} secondary={props.creator} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Data Utworzenia"} secondary={props.createdDate} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Data wygaśnięcia"} secondary={props.expiration} />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item sm={6}>
                        <List>
                            <ListItem>
                                <ListItemText primary={"Opis choroby"} secondary={props.shortDescription} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Opis szczegółowy"} secondary={props.description} />
                            </ListItem>
                        </List>
                    </Grid>
                <Grid item xs={12}>
                    <List>
                        <ListItem>
                            <ListItemText primary={"Leki"} />
                        </ListItem>
                    <List>
                        {props.medications ? (props.medications.map((medicament) => {
                            return(
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <LocalHospitalRoundedIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={medicament.name} secondary={`pozostało ${medicament.amountLeft}`} />
                                </ListItem>
                            )
                        })) : (
                            <p>brak leków</p>
                        )}
                    </List>
                    </List>
                </Grid>
            </Grid>
        </div>
    );

    return (
        <div>
            <Modal
                open={props.isOpen}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}

export default PrescriptionDetails;