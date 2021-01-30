import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {MyMenu} from 'components';
import {connect} from "react-redux";
import {logout} from "../../actions/auth"
import {useHistory} from "react-router";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(2),
    },
    nav: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

interface NavbarProps {
    logout: any;
    history: any;
}

const ButtonAppBar = ( props ) => {
    const history= useHistory();
    const classes = useStyles();
    const handleClick = () => {
        history.push("/");
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.nav} position='fixed'>
                <Toolbar >

                    <MyMenu classes={classes}/>

                    <Typography variant="h6" className={classes.title}>
                        <Button  onClick={() => handleClick()} variant={'text'} color={"inherit"}>eRecepty</Button>
                    </Typography>
                    <Button  onClick={()=>{props.logout()}} color="inherit">Wyloguj</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default connect(null , { logout })(ButtonAppBar);