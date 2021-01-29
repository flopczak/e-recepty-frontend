import React from "react";
import {Button, Container} from "@material-ui/core";
import {Route, Switch} from "react-router";
import {Login, MainView, Register, UserPrescriptionsView} from "components";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import {AddPrescriptionView, Navbar} from "./components";
import {connect} from "react-redux";
import {useHistory} from "react-router";
import PrescriptionExecutor from "./components/PerscriptionLogic/PrescriptionExecutor";

const Routes = (props) => {

    return (
        <Container>
            {props.isAuthenticated ? (
                <Navbar/>
            ) : (
              <></>
            )}
            <Switch>
                <Route exact path="/accept" component={AcceptMail} />
                <PrivateRoute exact path="/" component={MainView} />
                <PrivateRoute exact path="/user/:id" component={UserPrescriptionsView} />
                <PrivateRoute exact path="/prescription/:id" component={MainView} />
                <PrivateRoute exact path="/newPrescription" component={AddPrescriptionView} />
                <PrivateRoute exact path="/realisePrescription/:id" component={PrescriptionExecutor} />
                {/*<Route exact path="/" component={MainView} />*/}
                {/*<Route exact path="/user/:id" component={UserPrescriptionsView} />*/}
                {/*<Route exact path="/prescription/:id" component={MainView} />*/}
                {/*<Route exact path="/newPrescription" component={AddPrescriptionView} />*/}
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </Container>
    );
}
const AcceptMail = () => {
    const history = useHistory();
    const handleClick = () => {
        history.push("/login")
    }
    return(
        <div>
            <h1> Prosze potwierdzić email</h1>
            <Button onClick={() => handleClick()}> Przejdz do panelu logowania</Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Routes);