import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import M from "materialize-css/dist/js/materialize.min.js";

import "./App.css";
import AddItem from "./pages/Items/AddItem";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllItems from "./pages/Items/AllItems";
import ItemsState from "./context/items/itemsState";
import { AddCategory } from "./pages/Categories/addCategory";
import CategoryState from "./context/category/categoryState";
import { AllCategories } from "./pages/Categories/AllCategories";
import { EditCategory } from "./pages/Categories/EditCategory";

function App() {
	React.useEffect(() => {
		M.AutoInit();

		//eslint-disable-next-line
	}, []);
	return (
		<ItemsState>
			<CategoryState>
				<Router>
					<Switch>
						<Fragment>
							<Navbar />
							<div className="">
								<Route exact path="/" component={Home} />
								<Route path="/add-item" component={AddItem} />
								<Route path="/all-items" component={AllItems} />
								<Route path="/add-category" component={AddCategory} />
								<Route path="/categories" component={AllCategories} />
								<Route path="/category/:id" component={EditCategory} />
							</div>
						</Fragment>
					</Switch>
				</Router>
			</CategoryState>
		</ItemsState>
	);
}

export default App;
