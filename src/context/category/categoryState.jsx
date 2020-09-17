// @ts-nocheck
import {
	SET_LOADING,
	GET_CATEGORIES,
	CATEGORY_ERROR,
	SET_CATEGORY,
	CLEAR_CATEGORY,
	UPDATE_CATEGORY,
	FILTER_BY_CATEGORY,
	CLEAR_CATEGORY_FILTERS,
	CLEAR_CATEGORY_ERROR,
} from "../types";
import React, { useReducer } from "react";
import CategoryReducer from "./categoryReducer";
import CategoryContext from "./categoryContext";

import { db } from "../../services/firebase";
const CategoryState = (props) => {
	const initialState = {
		categories: [],
		current: null,
		filtered: null,
		loading: false,
		error: null,
	};

	const [state, dispatch] = useReducer(CategoryReducer, initialState);

	const addCategory = async (category) => {
		try {
			setLoading();
			console.log("CATEGOTY", category);
			const snap = db
				.collection("categories")
				.where("name", "==", category.name);

			const found = (await snap.get()).docs.length;

			if (found === 0) {
				await db.collection("categories").add(category);
				// @ts-ignore
				getCategories();
				clearCategoryError();
			} else if (found > 0) {
				// @ts-ignore
				console.log("EXIST");
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
			const snapshot = await db.collection("categories").get()
			const temp = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});

			// @ts-ignore
			dispatch({ type: GET_CATEGORIES, payload: temp });
		} catch (error) {
			console.log(error);
		}
	};

	const setCategory = async (id) => {
		try {
			setLoading();
			const doc = db.collection("categories").doc(id).get();
			const category = (await doc).data();

			dispatch({ type: SET_CATEGORY, payload: { id: id, ...category } });
		} catch (error) {
			dispatch({ type: CATEGORY_ERROR, payload: "no category found" });
		}
	};

	const filterByCategory = (text) => {
		dispatch({ type: FILTER_BY_CATEGORY, payload: text });
	};

	const updateCategory = async (category) => {
		try {
			setLoading();
			console.log('CATEGORY', category)
			await db.collection("categories").doc(category.id).update(category);

			dispatch({ type: UPDATE_CATEGORY, payload: category });
		} catch (e) {
			console.log(e);
		}
	};

	const deleteCategory = async (id) => {
		console.log(id);
		try {
			await db.collection("categories").doc(id).delete();

			getCategories();
		} catch (error) {
			console.log(error);
		}
	};

	const clearCategoryError = () => dispatch({ type: CLEAR_CATEGORY_ERROR });

	const clearFilters = () => dispatch({ type: CLEAR_CATEGORY_FILTERS });

	const clearCategory = () => dispatch({ type: CLEAR_CATEGORY });
	// @ts-ignore
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<CategoryContext.Provider
			value={{
				categories: state.categories,
				current: state.current,
				loading: state.loading,
				error: state.error,
				addCategory,
				getCategories,
				setLoading,
				setCategory,
				deleteCategory,
				clearCategory,
				updateCategory,
				filterByCategory,
				clearFilters,
				clearCategoryError,
			}}
		>
			{props.children}
		</CategoryContext.Provider>
	);
};

export default CategoryState;
