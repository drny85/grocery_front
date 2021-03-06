import React, { useContext } from "react";

import ItemsContext from "../context/items/itemsContext";
import "../pages/Items/AllItems.css";

export const CategoryLink = ({ category }) => {
	const itemsContext = useContext(ItemsContext);
	const { filterItemsByCategory } = itemsContext;

	const handleFilters = () => {
		filterItemsByCategory(category.id);
	};

	return (
		<div
			style={{ borderRadius: "12px", height: '6.5%' }}
			onClick={handleFilters}
			className={`card links align-center `}
		>
			<div className="align-center">
				<h5
					style={{ margin: "auto 0" }}
					className="capitalize bold"
					key={category.id}
				>
					{category.name}
				</h5>
			</div>
		</div>
	);
};
