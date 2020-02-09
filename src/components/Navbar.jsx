import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const Navbar = props => {
	const authContext = React.useContext(AuthContext);
	const { user, isAuthenticated } = authContext;
	const logout = () => {
		authContext.logout();
		props.history.replace("/signup");
	};
	return (
		<div className="navbar-fixed">
			<nav className="bg-light blue-grey ">
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mr-auto">
						{isAuthenticated ? (
							<>
								<li className="nav-item" data-toggle="collapse">
									<NavLink
										className="nav-link"
										exact
										activeClassName="current"
										to="/"
									>
										Home <span className="sr-only"></span>
									</NavLink>
								</li>
								<li className="nav-item" data-toggle="collapse">
									<NavLink
										className="nav-link"
										activeClassName="current"
										to="/item"
									>
										Add Item
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
								<li className="nav-item" data-toggle="collapse">
									<NavLink
										className="nav-link"
										activeClassName="current"
										to="/add-category"
									>
										Add Category
									</NavLink>
								</li>
								
								<li className="nav-item right mr-8" data-toggle="collapse">
								<button onClick={logout} className="btn flat grey">
									Log out
								</button>
							</li>
							<li style={{paddingRight: '20px'}} className="nav-item right mr-8 ">
								<h5 className="capitalize bold">
								{user.name}
								</h5>
								
								</li>
							</>
						) : (
							null
						)}
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default withRouter(Navbar);
