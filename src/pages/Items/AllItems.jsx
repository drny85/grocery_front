import React, { useEffect, useContext } from "react";

import Item from "../../components/Item";
import PropTypes from "prop-types";
import "./AddItem";
import ItemsContext from "../../context/items/itemsContext";
import { Loader } from "../../components/Loader";

const AllItems = () => {
	const itemsContext = useContext(ItemsContext);
	const { getItems, loading, items } = itemsContext;

	useEffect(() => {
		getItems();
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Loader/>
	}
	
	return (
		<div style={{ width: "95%", margin: "0 auto" }} className="main-container">
			<br />
			<div className="row">
				<div className="col s12 m2">
					<ul className="collection">
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
						<li className="collection-item">Alvin</li>
					</ul>
				</div>
				<div className="col s12 m10">
					<div className="flex">
						{items.map(item => {
							return <Item key={item.id} item={item} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

AllItems.propTypes = {
	item: PropTypes.array
};

export default AllItems;
