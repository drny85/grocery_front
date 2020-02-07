import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="navbar-fixed">
			<nav className="bg-light blue-grey ">
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mr-auto">
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
							<NavLink
								className="nav-link"
								activeClassName="current"
								to="/signup"
							>
								Sign Up
							</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
