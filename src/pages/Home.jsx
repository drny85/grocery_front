import React from "react";
import AuthContext from "../context/auth/authContext";

import { Loader } from "../components/Loader";
import useDatedOrders from "../utils/useDatedOrders";

const Home = ({ history }) => {
	const authContext = React.useContext(AuthContext);
	const { isLoading } = authContext;
	const orders = useDatedOrders();

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="container">
			<h3 className="center">Home</h3>
		</div>
	);
};

export default Home;
