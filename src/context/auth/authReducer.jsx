import {
	LOGIN,
	LOGOUT,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	SET_LOADING
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case LOGIN:
			localStorage.setItem("groceryToken", action.payload.userId);
			return {
				...state,
				isLoading: false,
				user: action.payload,
				isAuthenticated: true,
				error: null
			};
		case LOGOUT:
			localStorage.removeItem("groceryToken");
			return {
				...state,
				isLoading: false,
				user: null,
				isAuthenticated: false,
				error: null
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuthenticated: true,
				error: false
			};
		case SET_LOADING:
			return {
				...state,
				isLoading: true,
				error: false
			};

		case AUTH_ERROR:
			localStorage.removeItem("groceryToken");
			return {
				...state,
				error: action.payload,
				isLoading: false,
				isAuthenticated: false,
				user: null
			};

		default:
			return state;
	}
};
