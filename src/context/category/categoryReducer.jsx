import {
	SET_LOADING,
	GET_CATEGORIES,
	GET_CATEGORY,
	CATEGORY_ERROR,
	SET_CATEGORY,
	CLEAR_CATEGORY,
	UPDATE_CATEGORY,
	FILTER_BY_CATEGORY,
CLEAR_CATEGORY_FILTERS,
CLEAR_CATEGORY_ERROR
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case GET_CATEGORY:
			return {
				...state,
				category: action.payload,
				loading: false
			};
		case CATEGORY_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false
			};
			case CLEAR_CATEGORY_ERROR:
				return {
					...state,
					error: null,
					loading: false
				};
		case CLEAR_CATEGORY_FILTERS:
			return {
				...state,
				filtered: null,
				loading: false
			};
		case FILTER_BY_CATEGORY:
			return {
				...state,
				filtered: state.categories.filter(category => category.name === action.payload),
				loading: false
			};
		case UPDATE_CATEGORY:
			return {
				...state,
				categories: state.categories.map(category => category.id === action.payload.id ? action.payload : category),
				loading: false
			};
		case GET_CATEGORIES:
			return {
				...state,
				categories: [...action.payload],
				loading: false
			};

		case CLEAR_CATEGORY:
			return {
				...state,
				current: null,
				loading: false
			};

		case SET_CATEGORY:
			return {
				...state,
				current: action.payload,
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
