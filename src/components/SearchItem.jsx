import React, { useRef, useContext } from "react";
import ItemsContext from "../context/items/itemsContext";

// @ts-ignore
const SearchItem = props => {
	const text = useRef();

	const itemsContext = useContext(ItemsContext);
	const { filterByName, clearItemsFilters } = itemsContext;

	// @ts-ignore
	const onChange = e => {
		// @ts-ignore
		if (text.current.value !== "") {
			//search
			// @ts-ignore
			filterByName(text.current.value);
		} else {
			//show all items;
			clearItemsFilters();
		}
	};
	return (
		<div className="container ">
			<br />
			<form>
				<input
					ref={text}
					style={{ fontSize: "1.5rem" }}
					type="search"
					className="center"
					placeholder="Search items by name, category or description..."
					onChange={onChange}
				/>
			</form>
		</div>
	);
};

export default SearchItem;
