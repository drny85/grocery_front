// @ts-nocheck
import {
	SET_LOADING,
	GET_CATEGORIES,
	CATEGORY_ERROR,
	SET_CATEGORY,
	CLEAR_CATEGORY,
	UPDATE_CATEGORY
} from "../types";
import React, { useReducer } from "react";
import CategoryReducer from "./categoryReducer";
import CategoryContext from "./categoryContext";
import { db } from "../../services/firebase";
const ItemsState = props => {
	const initialState = {
		categories: [],
		category: null,
		loading: false,
		error: null
	};

	const [state, dispatch] = useReducer(CategoryReducer, initialState);

	const addCategory = async category => {
		try {
			setLoading();
			console.log(category);
			const snap = db
				.collection("categories")
				.where("name", "==", category.name);

			const found = (await snap.get()).exists;
			if (!found) {
				await db.collection("categories").add(category);
				// @ts-ignore
				getCategories();
			} else if (found) {
				// @ts-ignore
				dispatch({ type: CATEGORY_ERROR, payload: "category already exists" });
			}
		} catch (e) {
			console.log(e);
			// @ts-ignore

			dispatch({ type: CATEGORY_ERROR, payload: "there was an error" });
		}
	};

	const getCategories = async () => {
		try {
			setLoading();
			const snapshot = await db.collection("categories").get();
			const temp = snapshot.docs.map(doc => {
				return {
					id: doc.id,
					...doc.data()
				};
			});

			// @ts-ignore
			dispatch({ type: GET_CATEGORIES, payload: temp });
		} catch (error) {
			console.log(error);
		}
	};

	const setCategory = async id => {
		try {
			setLoading();
			const doc = db
				.collection("categories")
				.doc(id)
				.get();
			const category = (await doc).data();
			console.log(category);

			dispatch({ type: SET_CATEGORY, payload: { id: id, ...category } });
			
		} catch (error) {
			dispatch({ type: CATEGORY_ERROR, payload: "no category found" });
		}
	};

	const updateCategory = async category => {
		try {
			setLoading();
			console.log(category);
			await db
				.collection("categories")
				.doc(category.id)
				.update(category);
			dispatch({ type: UPDATE_CATEGORY, payload: category });
		} catch (e) {
			console.log(e);
		}
	};

	const clearCategory = () => dispatch({ type: CLEAR_CATEGORY });
	// @ts-ignore
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<CategoryContext.Provider
			value={{
				categories: state.categories,
				category: state.category,
				loading: state.loading,
				error: state.error,
				addCategory,
				getCategories,
				setLoading,
				setCategory,
				clearCategory,
				updateCategory
			}}
		>
			{props.children}
		</CategoryContext.Provider>
	);
};

export default ItemsState;
