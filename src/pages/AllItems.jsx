import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import Item from "../components/Item";
import PropTypes from "prop-types";
import "./AddItem";

const AllItems = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		getItems();
	}, []);

	const getItems = async () => {
		const snapshot = await db.collection("items").get();
		const temp = snapshot.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data()
			};
		});
		setItems(temp);
	};

	console.log(items);
	return (
		<div style={{width: "95%", margin: "0 auto"}} className="main-container">
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
