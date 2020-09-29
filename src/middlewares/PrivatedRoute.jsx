import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

import Signup from "../pages/Auth/Signup";


const PrivatedRoute = ({ component: Component, ...rest }) => {
	const authContext = React.useContext(AuthContext);
	const { isAuthenticated, isLoading, user } = authContext;

	if (!user) return <Signup />;

	const { isActive } = user;

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuthenticated && !isLoading && isActive) {
					return <Component {...props} />;
				} else {
					return <Redirect to="/signup" />;
				}
			}}
		/>
	);
};

export default PrivatedRoute;
