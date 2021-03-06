import React, { useContext } from "react";
import CategoryContext from "../context/category/categoryContext";
import { CategoryLink } from "./CategoryLink";

export const CategoriesList = ({ handlerFilters }) => {
	const categoryContext = useContext(CategoryContext);
	const { categories } = categoryContext;

	return (
		<div style={{ borderRadius: "12px", height: "100vh" }} className="card fixed">
			<div
				style={{ borderRadius: "12px", width: '100%', minWidth: '100px', height: '6.5%' }}
				onClick={handlerFilters}
				className="card align-center"
			>
				<div className="align-center">
					<h5 style={{ margin: "auto 0" }} className="capitalize bold">
						All Items
					</h5>
				</div>
			</div>
			{
				categories.map(category => (
					<CategoryLink key={category.id} category={category} />
				))
			}
		</div >
	);
};
