import React, { useEffect, useContext } from "react";
import CategoryContext from "../../context/category/categoryContext";

export const EditCategory = ({ match }) => {
	const categoryId = match.params.id;
	const categoryContext = useContext(CategoryContext);
	const { setCategory, category, clearCategory } = categoryContext;
	console.log(category);

	useEffect(() => {
		setCategory(categoryId);

		return () => {
			clearCategory();
		};
		//eslint-disable-next-line
	}, []);
	return (
		<div>
			<h4 className="center">EDIT</h4>
		</div>
	);
};
