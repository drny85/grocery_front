import {
	SET_LOADING,
	GET_ADDONS,

	CLEAR_ADDON,
	SET_ADDON,
	CLEAR_ADDON_ERROR,
    UPDATE_ADDON
} from "../types";

export default (state, action) => {
	switch (action.type) {
		case GET_ADDONS:
			return {
				...state,
				addons: action.payload,
				loading: false
            };
            case UPDATE_ADDON:
                return {
                    ...state,
                    addons: state.addons.map(addon => addon.id === action.payload.id ? action.payload : addon),
                    loading: false
                };

		case CLEAR_ADDON_ERROR:
			return {
				...state,
				error: null,
				loading: false
			};

		case SET_LOADING:
			return {
				...state,
				loading: true
			};
		case CLEAR_ADDON:
			return {
				...state,
				current: null,
				loading: false
			};

		case SET_ADDON:
			return {
				...state,
				current: action.payload,
				loading: false
			};

		default:
			return state;
	}
};
