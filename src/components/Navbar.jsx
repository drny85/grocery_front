import React, { useEffect } from "react";

import { NavLink, withRouter } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import { Loader } from "./Loader";

const Navbar = (props) => {
	const authContext = React.useContext(AuthContext);
	const { user, isAuthenticated, store, loading } = authContext;

	const logout = () => {
		authContext.logout();
		props.history.replace("/signup");
	};

	const adminRoute = (user) => {
		if (user.isAdmin && user.isActive || user?.isOwner) {
			return (
				<>
					<li className="nav-item" data-toggle="collapse">
						<NavLink className="nav-link" activeClassName="current" to="/item">
							Add Item
						</NavLink>
					</li>

					<li className="nav-item" data-toggle="collapse">
						<NavLink
							className="nav-link"
							activeClassName="current"
							to="/add-category"
						>
							Add Category
						</NavLink>
					</li>
					<li className="nav-item" data-toggle="collapse">
						<NavLink
							className="nav-link"
							activeClassName="current"
							to="/addons"
						>
							Addons
						</NavLink>
					</li>
				</>
			);
		}
	};





	if (loading) return <Loader />

	return (
		<div className="navbar-fixed">
			<nav className="bg-light secondary">
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mr-auto">
						{isAuthenticated && user.isActive ? (
							<>
								<li className="nav-item" data-toggle="collapse">
									<NavLink
										className="nav-link capitalize bold"
										exact
										activeClassName="current"
										to="/"
									>
										{store ? store.name : 'Home'} <span className="sr-only"></span>
									</NavLink>
								</li>

								<li className="nav-item" data-toggle="collapse">
									<NavLink
										className="nav-link"
										activeClassName="current"
										to="/all-items"
									>
										All Items
									</NavLink>
								</li>
								{adminRoute(user)}

								<li className="nav-item" data-toggle="collapse">
									<NavLink
										className="nav-link"
										activeClassName="current"
										to="/orders"
									>
										Orders
									</NavLink>
								</li>

								<li className="nav-item right mr-8" data-toggle="collapse">
									<button onClick={logout} className="btn flat grey">
										Log out
									</button>
								</li>
								<li
									style={{ paddingRight: "20px" }}
									className="nav-item right mr-8 "
								>
									<h5 className="capitalize bold">{user.name}</h5>
								</li>
							</>
						) : null}
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default withRouter(Navbar);
