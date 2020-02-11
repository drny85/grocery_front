import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import { Loader } from "./Loader";

const PrivatedRoute = ({ component: Component, ...rest }) => {
	const authContext = React.useContext(AuthContext);
	const { isAuthenticated, isLoading } = authContext;
	
	if (isLoading) {
		return <Loader />
	}
   
	return (
		<Route
			{...rest}
			render={props =>
				!isAuthenticated && !isLoading ? (
					<Redirect to="/signup" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PrivatedRoute;
