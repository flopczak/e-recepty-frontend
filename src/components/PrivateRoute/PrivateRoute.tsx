import * as React from 'react';
import { Redirect, Route } from 'react-router';
import { connect } from "react-redux"



const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {

    return (
        <Route
            {...rest}
            render={(props: any) => {
                if (!isAuthenticated) {
                    return <Redirect to="/login" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);