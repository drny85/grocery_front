// @ts-nocheck
import {
	ADD_ITEM,
	GET_ITEMS,
	SET_LOADING,
	FILTER_ITEMS_BY_CATEGORY,
	CLEAR_ITEMS_FILTERS,
	SEARCH_BY_NAME,
	SET_CURRENT_ITEM,
	CLEAR_CURRENT_ITEM,
	UPDATE_ITEM,
	DELETE_ITEM,
} from "../types";
import React, { useReducer } from "react";
import ItemsReducer from "./itemsReducer";
import ItemsContext from "./itemsContext";
import { db } from "../../services/firebase";

const ItemsState = (props) => {
	const initialState = {
		items: [],
		current: null,
		filtered: null,
		loading: false,
	};

	const [state, dispatch] = useReducer(ItemsReducer, initialState);

	const addItem = async (item) => {
		try {
			setLoading();
			const doc = await db.collection("items").add(item);
			const itemData = await db.collection("items").doc(doc.id).get();
			if (itemData.exists) {
				const t = {
					id: doc.id,
					...itemData.data(),
				};

				// @ts-ignore
				dispatch({ type: ADD_ITEM, payload: t });
			} else {
				throw new Error("No data");
			}
			// dispatch({type: ADD_ITEM, payload: })
		} catch (error) {
			console.log(error);
		}
	};

	const updateItem = async (item) => {
		try {
			setLoading();
			await db.collection("items").doc(item.id).update(item);
			dispatch({ type: UPDATE_ITEM, payload: item });
			getItems();
		} catch (error) {
			console.log(error);
		}
	};

	const getItems = async () => {
		try {
			setLoading();
			const snapshot = await db.collection("items").get();
			const temp = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			// @ts-ignore
			dispatch({ type: GET_ITEMS, payload: temp });
		} catch (error) {
			console.log(error);
		}
	};

	const filterItemsByCategory = (text) => {
		setLoading();
		dispatch({ type: FILTER_ITEMS_BY_CATEGORY, payload: text });
	};

	const clearItemsFilters = () => {
		setLoading();
		dispatch({ type: CLEAR_ITEMS_FILTERS });
	};

	const filterByName = (text) => {
		setLoading();
		dispatch({ type: SEARCH_BY_NAME, payload: text });
	};

	const setCurrent = (item) => {
		setLoading();
		dispatch({ type: SET_CURRENT_ITEM, payload: item });
	};

	const clearCurrent = () => {
		setLoading();
		dispatch({ type: CLEAR_CURRENT_ITEM });
	};

	const deleteItem = async (id) => {
		try {
			setLoading();
			await db.collection("items").doc(id).delete();
			dispatch({ type: DELETE_ITEM, payload: id });
		} catch (error) {
			console.log(error);
		}
	};
	const changeAvailability = async (id, value) => {
		try {
			setLoading();
			await db.collection("items").doc(id).update({
				available: value,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// @ts-ignore
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<ItemsContext.Provider
			value={{
				items: state.items,
				current: state.current,
				loading: state.loading,
				filtered: state.filtered,
				addItem,
				getItems,
				setLoading,
				clearItemsFilters,
				filterItemsByCategory,
				filterByName,
				setCurrent,
				clearCurrent,
				updateItem,
				deleteItem,
				changeAvailability,
			}}
		>
			{props.children}
		</ItemsContext.Provider>
	);
};

export default ItemsState;
