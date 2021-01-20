import {Navbar} from "../../index";
import React from "react";
import ButtonAppBar from "../../Navbar/Navbar";
import {Container} from "@material-ui/core";
import {PrivateRoute} from "../../PrivateRoute/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import Login from "../../Login/Login";
import { connect } from "react-redux";
import Register from "../../Register/Register";

const Content = ({auth}) => {
    return (
        <>
            <Container>
                <Switch>
                    <PrivateRoute exath path ="/login" component={Login}/>
                    <PrivateRoute exath path ="/register" component={Register}/>
                </Switch>
            </Container>
            </>
    );
};

Content.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Content);