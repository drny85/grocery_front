import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import M from "materialize-css/dist/js/materialize.min.js";

import "./App.css";
import AddItem from "./pages/AddItem";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
	React.useEffect(() => {
		M.AutoInit();

		//eslint-disable-next-line
	}, []);
	return (
		<Router>
			<Switch>
				<Fragment>
					<Navbar />
					<div className="container">
						<Route exact path="/" component={Home} />
						<Route path="/add-item" component={AddItem} />
					</div>
				</Fragment>
			</Switch>
		</Router>
	);
}

export default App;
