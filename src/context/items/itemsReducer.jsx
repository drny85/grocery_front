import { ADD_ITEM, GET_ITEMS, SET_LOADING } from "../types";

export default (state, action) => {
	switch (action.type) {
		case ADD_ITEM:
			return {
				...state,
				items: [...state.items, action.payload],
				loading: false
			};

		case GET_ITEMS:
			return {
				...state,
                items: [...action.payload],
                loading: false
			};

		case SET_LOADING:
			return {
				...state,
				loading: true
			};

		default:
			return state;
	}
};
