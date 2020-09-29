// @ts-nocheck
import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";

import { SET_LOADING, LOGIN, LOGOUT, AUTH_ERROR } from "../types";
import { auth, db } from "../../services/firebase";

const AuthState = (props) => {
	const initialState = {
		user: null,
		isLoading: false,
		isAuthenticated: false,
		isAdmin: false,
		isOwner: false,
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	const login = async (email, password) => {
		return await auth.signInWithEmailAndPassword(email, password);
	};

	const setLogin = async (user) => {
		setLoading();
		const n = await db.collection("users").doc(user.uid).get();

		const u = n.data();
		if (u) {
			dispatch({
				type: LOGIN,
				payload: u,
			});
		}
	};

	const signup = async (email, password) => {
		return await auth.createUserWithEmailAndPassword(email, password);
	};

	const setError = (error) => dispatch({ type: AUTH_ERROR, payload: error });

	const autoLogin = () => {
		auth.onAuthStateChanged((u) => {
			if (u) {
				setLogin(u);
			}
		});
	};

	const logout = async () => {
		setLoading();
		await auth.signOut();
		dispatch({ type: LOGOUT });
	};

	const setUser = async (user) => {
		try {
			setLoading();
			await db.collection("users").doc(user.uid).set({
				userId: user.uid,
				email: user.email,
				name: user.name,
				lastName: user.lastname,
				createdAt: new Date().toISOString(),
				isAdmin: false,
				isActive: false,
				isOwner: false,
				store: null
			});

			const newUser = await db.collection("users").doc(user.id).get();
			const createdUser = { userId: newUser.id, ...newUser.data() };

			console.log("Created", createdUser);

			dispatch({
				type: LOGIN,
				payload: createdUser,
			});
		} catch (error) {
			setError(error.message);
		}
	};

	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isLoading: state.isLoading,
				isAuthenticated: state.isAuthenticated,
				isAdmin: state.isAdmin,
				isOwner: state.isOwner,
				error: state.error,
				login,
				logout,
				signup,
				setError,
				setUser,
				autoLogin,
				setLogin,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
