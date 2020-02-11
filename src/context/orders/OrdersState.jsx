// @ts-nocheck
import { SET_LOADING, GET_ORDER, GET_ORDERS, SET_CURRENT_ITEM, CLEAR_CURRENT_ITEM, GET_NAMES } from "../types";
import React, { useReducer } from "react";
import OrdersReducer from "./ordersReducer";
import OrdersContext from "./ordersContext";
import { db } from "../../services/firebase";


const ItemsState = props => {
	const initialState = {
		orders: [],
		current: null,
		filtered: null,
		loading: false,
		names: []
	};

	const ordersRef = db.collection("orders");

	const [state, dispatch] = useReducer(OrdersReducer, initialState);

	// @ts-ignore
	const setLoading = () => dispatch({ type: SET_LOADING });

	const getOrder = async orderId => {
		setLoading();
		const order = (await ordersRef.doc(orderId).get()).data();
		dispatch({ type: GET_ORDER, payload: order });
	};

	const getOrders = async () => {
		setLoading();
        const snapshot = await ordersRef.get();
    
		const orders = snapshot.docs.map(order => {
			return {
				id: order.id,
				...order.data()
			};
        });
        console.log("ORDERS", orders.length);

		dispatch({ type: GET_ORDERS, payload: orders });
	};

	const setCurrentOrder = async id => {
		try {
			setLoading();
			const order = (await ordersRef.doc(id).get()).data();
			dispatch({type: SET_CURRENT_ITEM, payload: order});
		} catch (error) {
			console.log(error);
		}
	}
	const clearCurrent = () => dispatch({type: CLEAR_CURRENT_ITEM});


	const getNames = async () => {
		try {
			setLoading();
			const snapshot = await db.collection('names').get();
		
			const names = snapshot.docs.map(order => {
				return {
					id: order.id,
					...order.data()
				};
			});
			console.log(names);
			console.log("names", names.length);
	
			dispatch({ type: GET_NAMES, payload: names });
		} catch (error) {
			console.log(error)
		}
	}
		
	
	return (
		<OrdersContext.Provider
			value={{
                orders: state.orders,
                current: state.current,
				loading: state.loading,
				filtered: state.filtered,
				names: state.names,
				getOrders,
				setCurrentOrder,
				setLoading,
				getOrder,
				getNames,
				clearCurrent
			}}
		>
			{props.children}
		</OrdersContext.Provider>
	);
};

export default ItemsState;
