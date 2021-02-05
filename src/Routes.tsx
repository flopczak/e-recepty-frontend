import React from "react";
import {Button, Container} from "@material-ui/core";
import {Route, Switch} from "react-router";
import {Login, MainView, Register, UserPrescriptionsView} from "components";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {AddPrescriptionView, Navbar} from "./components";
import {connect} from "react-redux";
import PrescriptionExecutor from "./components/PerscriptionLogic/PrescriptionExecutor";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    accept: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const Routes = (props) => {

    return (
        <Container>
            {props.isAuthenticated ? (
                <Navbar/>
            ) : (
              <></>
            )}
            <Switch>
                <Route exact path="/accept" component={AcceptView} />
                <PrivateRoute exact path="/" component={MainView} />
                <PrivateRoute exact path="/user/:id" component={UserPrescriptionsView} />
                <PrivateRoute exact path="/prescription/:id" component={MainView} />
                <PrivateRoute exact path="/newPrescription" component={AddPrescriptionView} />
                <PrivateRoute exact path="/realisePrescription/:id" component={PrescriptionExecutor} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </Container>
    );
}

const AcceptView = () => {
    const classes = useStyles();
    return(
        <h1 className={classes.accept}>
            Potwierdzono email
        </h1>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Routes);