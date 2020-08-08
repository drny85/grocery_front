// @ts-nocheck
import {
	SET_LOADING,
	GET_ORDER,
	GET_ORDERS,
	SET_CURRENT_ITEM,
	CLEAR_CURRENT_ITEM,
	CHANGE_STATUS,
	ORDERS_COUNT
} from "../types";
import React, { useReducer } from "react";
import OrdersReducer from "./ordersReducer";
import OrdersContext from "./ordersContext";
import { db } from "../../services/firebase";

const OrdersState = props => {
	const initialState = {
		orders: [],
		current: null,
		filtered: null,
		loading: false,
		delivered: 0,
		in_progress: 0,
		_new: 0
	};

	const ordersRef = db.collection("orders");

	const [state, dispatch] = useReducer(OrdersReducer, initialState);

	// @ts-ignore
	const setLoading = () => dispatch({ type: SET_LOADING });

	const getOrder = async orderId => {
		setLoading();
		const order = await ordersRef.doc(orderId).get();
		dispatch({ type: GET_ORDER, payload: { id: order.id, ...order.data() } });
	};

	let listener;
	const getOrders = async () => {
		setLoading();
		listener = await ordersRef
			.orderBy("orderPlaced", "desc")
			.onSnapshot(values => {
				let orders = [];
				values.forEach(doc => {
					let order = {
						id: doc.id,
						...doc.data()
					};
					orders.push(order);
				});

				dispatch({ type: GET_ORDERS, payload: orders });
				calculateOrderCounts();
			});
	};

	const changeStatus = async (id, status) => {
		try {
			console.log(id, status);
			setLoading();
			await ordersRef.doc(id).update({
				status
			});

			dispatch({ type: CHANGE_STATUS, payload: { id, status } });
		} catch (error) {
			console.log(error);
		}
	};

	const setCurrentOrder = async id => {
		try {
			setLoading();
			await ordersRef.doc(id).onSnapshot(order =>
				dispatch({
					type: SET_CURRENT_ITEM,
					payload: { id: order.id, ...order.data() }
				})
			);
		} catch (error) {
			console.log(error);
		}
	};
	const clearCurrent = () => dispatch({ type: CLEAR_CURRENT_ITEM });

	const calculateOrderCounts = () => {
		dispatch({ type: ORDERS_COUNT });
	};

	//names subscription;

	const stopListening = () => {
		listener();
	};

	return (
		<OrdersContext.Provider
			value={{
				orders: state.orders,
				current: state.current,
				loading: state.loading,
				filtered: state.filtered,
				_new: state._new,
				delivered: state.delivered,
				in_progress: state.in_progress,
				getOrders,
				setCurrentOrder,
				setLoading,
				getOrder,
				clearCurrent,
				changeStatus,
				stopListening
			}}
		>
			{props.children}
		</OrdersContext.Provider>
	);
};

export default OrdersState;
