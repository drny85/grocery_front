// @ts-nocheck
import { ADD_ITEM, GET_ITEMS, SET_LOADING } from "../types";
import React, { useReducer } from "react";
import ItemsReducer from "./itemsReducer";
import ItemsContext from "./itemsContext";
import { db } from "../../services/firebase";
const ItemsState = props => {
	const initialState = {
		items: [],
		item: null,
		loading: false
	};

	const [state, dispatch] = useReducer(ItemsReducer, initialState);

	const addItem = async item => {
		try {
			setLoading();
			const doc = await db.collection("items").add(item);
			const itemData = await db
				.collection("items")
				.doc(doc.id)
				.get();
			if (itemData.exists) {
				const t = {
					id: doc.id,
					...itemData.data()
				};
				console.log(t);
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

	const getItems = async () => {
		try {
			setLoading();
			const snapshot = await db.collection("items").get();
			const temp = snapshot.docs.map(doc => {
				return {
					id: doc.id,
					...doc.data()
				};
			});
			// @ts-ignore
			dispatch({ type: GET_ITEMS, payload: temp });
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
				item: state.item,
				loading: state.loading,
				addItem,
				getItems,
                setLoading
               
			}}
		>
			{props.children}
		</ItemsContext.Provider>
	);
};

export default ItemsState;
