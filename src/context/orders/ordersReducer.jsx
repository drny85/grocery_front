import {
	SET_LOADING,
	GET_ORDER,
	GET_ORDERS,
	SET_CURRENT_ITEM,
	CLEAR_CURRENT_ITEM,
	GET_NAMES
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: true,
				error: null
			};
		case GET_NAMES:
			return {
				...state,
				loading: false,
				error: null,
				names: [...action.payload]
			}

		case SET_CURRENT_ITEM:
			return {
				...state,
				current: action.payload,
				loading: false,
				error: null
			};

		case CLEAR_CURRENT_ITEM:
			return {
				...state,
				loading: false,
				current: null,
				error: null
			};

		case GET_ORDER:
			return {
				...state,
				current: action.payload,
				loading: false,
				error: false
			};
		case GET_ORDERS:
			return {
				...state,
				orders: [...action.payload],
				loading: false,
				error: false
			};

		default:
			return state;
	}
};
