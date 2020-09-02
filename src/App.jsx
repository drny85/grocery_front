import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import { auth } from "./services/firebase";
import AllOrders from "./pages/orders/AllOrders";
import AuthContext from "./context/auth/authContext";
import OrdersState from "./context/orders/OrdersState";
import PrivateRoute from "./components/PrivatedRoute";
import { Loader } from "./components/Loader";
import NotificationSate from "./context/notifications/NotificationState";
import OrderDetails from "./pages/orders/OrderDetails";
import AddonsState from "./context/addons/AddonsState";
import AddUpdateAddons from "./pages/addons/AddUpdateAddons";
import AdminRoute from "./components/AdminRoute";

const App = () => {
	const authContext = React.useContext(AuthContext);
	React.useEffect(() => {
		M.AutoInit();

		auth.onAuthStateChanged((user) => {
			if (authContext.isLoading) {
				console.log("YES");
				return <Loader />;
			}
			if (user) {
				authContext.setLogin(user);
			}
		});
		//eslint-disable-next-line
	}, []);

	return (
		<NotificationSate>
			<ItemsState>
				<AddonsState>
					<OrdersState>
						<CategoryState>
							<AlertState>
								<Router>
									<Switch>
										<Fragment>
											<Navbar />

											<div className="">
												<AdminRoute exact path="/item" component={AddUpdateItem} />
												<AdminRoute
													exact
													path="/item/:id"
													component={AddUpdateItem}
												/>

												<PrivateRoute path="/all-items" component={AllItems} />
												<PrivateRoute
													path="/add-category"
													component={AddCategory}
												/>
												<PrivateRoute
													path="/categories"
													component={AllCategories}
												/>
												<AdminRoute
													path="/category/:id"
													component={EditCategory}
												/>
												<AdminRoute
													path="/addons"
													component={AddUpdateAddons}
												/>
												<PrivateRoute path="/orders" component={AllOrders} />
												<PrivateRoute
													path="/order/details"
													component={OrderDetails}
												/>
												<Route path="/signup" component={Signup} />
												<PrivateRoute exact path="/" component={Home} />
											</div>
										</Fragment>
									</Switch>
								</Router>
							</AlertState>
						</CategoryState>
					</OrdersState>
				</AddonsState>
			</ItemsState>
		</NotificationSate>
	);
};

export default () => {
	return (
		<AuthState>
			<App />
		</AuthState>
	);
};
