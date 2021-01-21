import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {MyMenu} from 'components';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
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

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.nav} position="absolute">
                <Toolbar >

                    <MyMenu classes={classes}/>

                    <Typography variant="h6" className={classes.title}>
                        eRecepty
                    </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
