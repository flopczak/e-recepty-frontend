import React, {useEffect, useState} from 'react'
import QrReader from 'react-qr-scanner'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useHistory} from "react-router";
import axios from "axios";
import {connect} from 'react-redux';
import {Button} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 2),
    },
    submit: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
}));

const CodeReader = (props) =>  {
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [result, setResult] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleScan = (data) => {
        if(result === "No result" || result === null){
            setResult(data)
        }
    }

    useEffect(() => {
        if(result !== "No result" && result !== null){
            axios.get(`https://recepty.eu.ngrok.io/api/prescription/${result.text}`,{
                headers: {"Authorization" : `Bearer ${props.token}`}
            })
                .then((response) => {
                    console.log(response)
                    history.push({pathname: `/realisePrescription/${result.text}`, state: response.data} );
                })
                .catch((err) => {
                    //TODO swall error
                    console.log(err);
                })
        }
    }, [result])

    const handleError = (err) => {
        console.error(err)
    }
    const previewStyle = {
        height: 240,
        width: 320,
    }

    return(
        <div>
            <Button className={classes.submit} onClick={handleOpen} fullWidth variant="contained" color="primary" type={"submit"}>Wczytaj z kodu QR</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                          <QrReader
                                delay={false}
                                style={previewStyle}
                                onError={handleError}
                                onScan={handleScan}
                            />
                    </div>
                </Fade>
            </Modal>
        </div>

    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token
});
export default connect(mapStateToProps)(CodeReader);