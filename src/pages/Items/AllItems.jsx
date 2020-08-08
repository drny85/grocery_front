import React, { useEffect, useContext } from "react";

import Item from "../../components/Item";
import PropTypes from "prop-types";
import "./AddUpdateItem";
import ItemsContext from "../../context/items/itemsContext";
import CategoryContext from "../../context/category/categoryContext";
import { Loader } from "../../components/Loader";

import { CategoriesList } from "../../components/CategoriesList";
import SearchItem from "../../components/SearchItem";
import { Link } from "react-router-dom";

const AllItems = ({ match }) => {
	const itemsContext = useContext(ItemsContext);
	const categoryContext = useContext(CategoryContext);
	const {
		getItems,
		loading,
		items,
		filtered,
		clearItemsFilters,
	} = itemsContext;
	const { getCategories } = categoryContext;

	useEffect(() => {
		getItems();
		getCategories();

		return () => {
			clearItemsFilters();
		};
		// eslint-disable-next-line
	}, []);

	const handlerFilters = () => {
		clearItemsFilters();
	};

	if (loading) {
		return <Loader />;
	}

	if (items.length === 0) {
		return (
			<div className="container loading-spinner">
				<h4 className="center">No Items Added Yet</h4>
				<br />
				<br />
				<Link
					to="/item"
					style={{ marginTop: "40px" }}
					className="btn blue-grey loading-spinner"
				>
					Add your first Item
				</Link>
			</div>
		);
	}

	return (
		<div style={{ width: "95%", margin: "0 auto" }} className="main-container">
			<SearchItem />
			<br />
			<div className="row">
				<div className="col s12 m2">
					<CategoriesList handlerFilters={handlerFilters} />
				</div>
				<div className="col s12 m10">
					<div className="flex">
						{!filtered ? (
							items.map((item) => {
								return <Item key={item.id} item={item} />;
							})
						) : filtered.length === 0 ? (
							<h4 className="center">No Items Found </h4>
						) : (
							filtered.map((item) => {
								return <Item key={item.id} item={item} />;
							})
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

AllItems.propTypes = {
	item: PropTypes.array,
};

export default AllItems;
