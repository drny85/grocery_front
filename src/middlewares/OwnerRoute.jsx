import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

import Signup from "../pages/Auth/Signup";


const OwnerRoute = ({ component: Component, ...rest }) => {
    const authContext = React.useContext(AuthContext);
    const { isAuthenticated, isLoading, user } = authContext;

    if (!user) return <Signup />;

    const { isActive, isOwner } = user;

    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuthenticated && !isLoading && isActive && isOwner) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/signup" />;
                }
            }}
        />
    );
};

export default OwnerRoute;
