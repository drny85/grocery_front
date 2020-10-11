// @ts-nocheck
import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";

import { SET_LOADING, LOGIN, LOGOUT, AUTH_ERROR, SET_STORE } from "../types";
import { auth, db } from "../../services/firebase";

const AuthState = (props) => {
	const initialState = {
		user: null,
		isLoading: false,
		isAuthenticated: false,
		isAdmin: false,
		isOwner: false,
		error: null,
		store: null
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	const login = async (email, password) => {
		return await auth.signInWithEmailAndPassword(email, password);
	};

	const setLogin = async (user) => {

		try {
			setLoading();
			const n = await db.collection("users").doc(user.uid).get();

			const u = n.data();

			userStore(u.store)
			if (u) {
				dispatch({
					type: LOGIN,
					payload: u,
				});

			}



		} catch (error) {
			console.log('logging in', error)
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

	const userStore = async storeId => {
		try {
			if (storeId) {

				setLoading()
				const store = (await db.collection('stores').doc(storeId).get())
				dispatch({ type: SET_STORE, payload: { id: store.id, ...store.data() } })
			}

		} catch (error) {
			console.log(error)
		}

	}

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
				store: state.store,
				login,
				logout,
				signup,
				setError,
				setUser,
				autoLogin,
				setLogin,
				userStore,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
