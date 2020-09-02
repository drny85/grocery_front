// @ts-nocheck
import { SET_NOTIFICATION, REMOVE_NOTICATION } from "../types";
import React, { useReducer } from "react";
import NotificationReducer from "./notificationReducer";
import NotificationContext from "./notificationContext";
import { db } from "../../services/firebase";

const NotificationState = (props) => {
	const initialState = {
		notification: false,
	};

	const [state, dispatch] = useReducer(NotificationReducer, initialState);

	const setNotification = async () => {
		try {
			db.collection("orders").onSnapshot((docs) =>
				docs.docChanges().forEach((doc) => {
					if (doc.type === "added") {
						dispatch({ type: SET_NOTIFICATION, payload: true });
						setTimeout(() => removeNotification(), 1000);
					}
					if (doc.type === "modified") {
						dispatch({ type: SET_NOTIFICATION, payload: true });
						setTimeout(() => removeNotification(), 1000);
					}
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	const removeNotification = () => dispatch({ type: REMOVE_NOTICATION });

	return (
		<NotificationContext.Provider
			value={{
				notification: state.notification,
				setNotification,
				removeNotification,
			}}
		>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationState;
