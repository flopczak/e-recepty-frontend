import React from "react";
import {Container} from "@material-ui/core";
import {Route, Switch} from "react-router";
import {Login, MainView, Register} from "./components";


const Routes = () => {

    return (
        <Container>
            <Switch>
                <Route exact path="/" component={MainView} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </Container>
    );
}

export default Routes;