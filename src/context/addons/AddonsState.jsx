// @ts-nocheck
import {
	SET_LOADING,
	GET_ADDONS,
	ADDON_ERROR,
	CLEAR_ADDON_ERROR,
	CLEAR_ADDON,
    UPDATE_ADDON,
    SET_ADDON
} from "../types";
import React, { useReducer } from "react";
import AddonsReducer from "./addonsReducer";
import AddonsContext from "./addonsContext";

import { db } from "../../services/firebase";
const AddonsState = props => {
	const initialState = {
		addons: [],
		current: null,
		loading: false,
		error: null
	};

	const [state, dispatch] = useReducer(AddonsReducer, initialState);

	const addAddon = async addon => {
		try {
			setLoading();
			const snap = db.collection("addons").where("name", "==", addon.name);

			const found = (await snap.get()).docs.length;

			if (found === 0) {
				await db.collection("addons").add(addon);

				getAddons()
				clearAddonsError();
			} else if (found > 0) {
				// @ts-ignore
				dispatch({ type: ADDON_ERROR, payload: "addon already exists" });
			}
		} catch (e) {
			console.log(e);
			// @ts-ignore

			dispatch({ type: ADDON_ERROR, payload: "there was an error" });
		}
	};

	const getAddons = async () => {
		try {
			setLoading();
			const snapshot = await db.collection("addons").get();
			const temp = snapshot.docs.map(doc => {
				return {
					id: doc.id,
					...doc.data()
				};
			});

			// @ts-ignore
			dispatch({ type: GET_ADDONS, payload: temp });
		} catch (error) {
			console.log(error);
		}
	};

	const setAddon = async id => {
		try {
			setLoading();
			const doc = db
				.collection("addons")
				.doc(id)
				.get();
			const category = (await doc).data();

			dispatch({ type: SET_ADDON, payload: { id: id, ...category } });
		} catch (error) {
			dispatch({ type: ADDON_ERROR, payload: "no addon found" });
		}
	};

	const updateAddon = async addon => {
		try {
			setLoading();

			await db
				.collection("addons")
				.doc(addon.id)
				.update(addon);

			dispatch({ type: UPDATE_ADDON, payload: addon });
		} catch (e) {
			console.log(e);
		}
	};

	const clearAddonsError = () => dispatch({ type: CLEAR_ADDON_ERROR });

	const clearAddon = () => dispatch({ type: CLEAR_ADDON });
	// @ts-ignore
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<AddonsContext.Provider
			value={{
				addons: state.addons,
				current: state.current,
				loading: state.loading,
				error: state.error,
                addAddon,
				setLoading,
				setAddon,
				clearAddon,
				updateAddon,
                getAddons,
				clearAddonsError
			}}
		>
			{props.children}
		</AddonsContext.Provider>
	);
};

export default AddonsState;
