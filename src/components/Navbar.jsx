import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light  blue-grey navbar-fixed">
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item" data-toggle="collapse">
						<NavLink className="nav-link" exact activeClassName="current" to="/">
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
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
