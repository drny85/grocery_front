import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light  blue-grey">
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active" data-toggle="collapse">
						<NavLink className="nav-link" to="/">
							Home <span className="sr-only"></span>
						</NavLink>
					</li>
					<li className="nav-item" data-toggle="collapse">
						<NavLink className="nav-link" to="/add-item">
							Add Item
						</NavLink>
					</li>
					<li className="nav-item" data-toggle="collapse">
						<NavLink className="nav-link" to="/all-items">
							All Items
						</NavLink>
					</li>
					<li className="nav-item" data-toggle="collapse">
						<NavLink className="nav-link" to="/add-category">
							Add Category
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
