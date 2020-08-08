import React from "react";
import { Route } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import { Loader } from "./Loader";
import Signup from "../pages/Auth/Signup";

const PrivatedRoute = ({ component: Component, ...rest }) => {
	const authContext = React.useContext(AuthContext);
	const { isAuthenticated, isLoading } = authContext;

	// if (!isAuthenticated) {
	// 	return <Loader />;
	// }

	return (
		<Route
			{...rest}
			render={(props) =>
				!isAuthenticated && !isLoading ? <Signup /> : <Component {...props} />
			}
		/>
	);
};

export default PrivatedRoute;
