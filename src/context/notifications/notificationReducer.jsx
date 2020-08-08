import { SET_NOTIFICATION, REMOVE_NOTICATION } from "../types";

export default (state, action) => {
	switch (action.type) {
		case SET_NOTIFICATION:
			return {
				...state,
				notification: action.payload
			};
	
        case REMOVE_NOTICATION:
            return {
                ...state,
                notification: false
            }
		default:
			return state;
	}
};
