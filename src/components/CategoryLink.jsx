import React, { useContext } from "react";

import ItemsContext from "../context/items/itemsContext";


export const CategoryLink = ({category}) => {
	const itemsContext = useContext(ItemsContext);
	const { filterItemsByCategory} = itemsContext;



	const handleFilters = () => {
	
		filterItemsByCategory(category.id);
		
	};


	return (
		
		<div style={{height: "8%", borderRadius: "12px"}} onClick={handleFilters} className={`card align-center `}>
		<div className="align-center">
		<h5 style={{margin: "auto 0"}} className="capitalize bold" key={category.id}>{category.name}</h5>
		</div>
	
	</div>
	
	);
};
