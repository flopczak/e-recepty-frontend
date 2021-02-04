import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { withRouter } from "react-router-dom"
import useReactRouter from "use-react-router";


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({}))(MenuItem);

const MyMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {history} = useReactRouter();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const  handleMenuClick = (redirectDirection) => {
        history.push(`/${redirectDirection}`)
    }


    return (
        <div>
            <IconButton onClick={handleClick} edge="start" className={props.classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={() => handleMenuClick("newPrescription")}>
                    <ListItemIcon>
                        <SendIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Dodaj recepte" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

export default withRouter(MyMenu);