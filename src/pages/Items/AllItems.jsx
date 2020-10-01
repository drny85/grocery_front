// @ts-nocheck
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

import "./AllItems.css";
import authContext from "../../context/auth/authContext";

const AllItems = ({ match }) => {
	const itemsContext = useContext(ItemsContext);
	const categoryContext = useContext(CategoryContext);
	const { user } = useContext(authContext)
	const {
		getItems,
		loading,
		items,
		filtered,
		clearItemsFilters,
	} = itemsContext;
	const { getCategories } = categoryContext;

	useEffect(() => {
		getItems(user?.store);
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
		<div className="all-items">
			<div className="content_search">
				<SearchItem />
			</div>

			<div className="content">
				<div className="content_category">
					<CategoriesList handlerFilters={handlerFilters} />
				</div>
				<div className="content_items">
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
		// <div style={{ width: "95%", margin: "0 auto" }} className="main-container">
		// 	<SearchItem />
		// 	<br />
		// 	<div className="main">
		// 		<div className="categories">
		// 			<CategoriesList handlerFilters={handlerFilters} />
		// 		</div>
		// 		<div className="items">
		// 			<div className="flex">
		// 				{!filtered ? (
		// 					items.map((item) => {
		// 						return <Item key={item.id} item={item} />;
		// 					})
		// 				) : filtered.length === 0 ? (
		// 					<h4 className="center">No Items Found </h4>
		// 				) : (
		// 							filtered.map((item) => {
		// 								return <Item key={item.id} item={item} />;
		// 							})
		// 						)}
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

AllItems.propTypes = {
	item: PropTypes.array,
};

export default AllItems;
