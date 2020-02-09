import React from "react";
import AuthContext from "../context/auth/authContext";
import { auth } from "../services/firebase";
import { Loader } from "../components/Loader";

const Home = ({history}) => {
	const authContext = React.useContext(AuthContext);
	const { user, isLoading } = authContext;
	console.log(user);
	React.useEffect(() => {
		console.log(isLoading);
		auth.onAuthStateChanged(u => {
			if (u) {
				authContext.setLogin(u);
			} else {
				
				history.replace('/signup')
			}
		});
		//eslint-disable-next-line
	}, []);
	console.log(isLoading);

	
	if (isLoading) {
		return <Loader />
	}

	return (
		
		<div className="container">
			<h3 className="center">Home</h3>
		</div>
		
	);
};

export default Home;
