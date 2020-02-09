import React, { Fragment, useContext } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import M from "materialize-css/dist/js/materialize.min.js";

import "./App.css";
import AddUpdateItem from "./pages/Items/AddUpdateItem";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllItems from "./pages/Items/AllItems";
import ItemsState from "./context/items/itemsState";
import { AddCategory } from "./pages/Categories/addCategory";
import CategoryState from "./context/category/categoryState";
import { AllCategories } from "./pages/Categories/AllCategories";
import { EditCategory } from "./pages/Categories/EditCategory";
import Signup from "./pages/Auth/Signup";
import AlertState from "./context/alerts/AlertState";
import AuthState from "./context/auth/AuthState";
import AuthContext from "./context/auth/authContext";
import { auth } from "./services/firebase";

function App() {
	React.useEffect(() => {
		M.AutoInit();

		auth.onAuthStateChanged(user => {
			if (user) {
				console.log("there");
				return <Redirect to="/" />;
			}
		});
		//eslint-disable-next-line
	}, []);

	return (
		<AuthState>
			<ItemsState>
				<CategoryState>
					<AlertState>
						<Router>
							<Switch>
								<Fragment>
									<Navbar />

									<div className="">
										<Route exact path="/" component={Home} />
										<Route path="/item" component={AddUpdateItem} />
										<Route path="/all-items" component={AllItems} />
										<Route path="/add-category" component={AddCategory} />
										<Route path="/categories" component={AllCategories} />
										<Route path="/category/:id" component={EditCategory} />
										<Route path="/signup" component={Signup} />
									</div>
								</Fragment>
							</Switch>
						</Router>
					</AlertState>
				</CategoryState>
			</ItemsState>
		</AuthState>
	);
}

export default App;
