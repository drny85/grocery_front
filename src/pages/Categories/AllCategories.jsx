import React, { useEffect, useContext } from "react";
import CategoryContext from "../../context/category/categoryContext";
import { Link } from "react-router-dom";

export const AllCategories = props => {
	const categoryContext = useContext(CategoryContext);
	const {
		getCategories,
		categories,
		setCategory,
		clearCategory
	} = categoryContext;

	useEffect(() => {
		getCategories();

		return () => {
			clearCategory();
		};
		//eslint-disable-next-line
	}, []);
	return (
		<div className="container">
			<br />
			<ul className="collection with-header">
				<li className="collection-header">
					<h4>All Categories</h4>
				</li>
				{categories.length > 0 ? (
					categories.map(category => (
						<li key={category.id} className="collection-item">
							<div style={{ textTransform: "capitalize" }}>
								{category.name}
								<Link
									to="#"
									onClick={() => setCategory(category.id)}
									className="secondary-content"
								>
									<i className="material-icons">edit</i>
								</Link>
							</div>
						</li>
					))
				) : (
					<div className="center">No categries</div>
				)}
			</ul>
		</div>
	);
};
