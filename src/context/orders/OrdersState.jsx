// @ts-nocheck
import {
  SET_LOADING,
  GET_ORDER,
  GET_ORDERS,
  SET_CURRENT_ITEM,
  CLEAR_CURRENT_ITEM,
  CHANGE_STATUS,
  ORDERS_COUNT,
  SEARCH_ORDERS,
} from "../types";
import React, { useReducer } from "react";
import OrdersReducer from "./ordersReducer";
import OrdersContext from "./ordersContext";
import { db } from "../../services/firebase";

const OrdersState = (props) => {
  const initialState = {
    orders: [],
    current: null,
    filtered: [],
    loading: false,
    delivered: 0,
    in_progress: 0,
    _new: 0,
  };

  const ordersRef = db.collection("orders");

  const [state, dispatch] = useReducer(OrdersReducer, initialState);

  // @ts-ignore
  const setLoading = () => dispatch({ type: SET_LOADING });

  const getOrder = async (orderId) => {
    setLoading();
    const order = await ordersRef.doc(orderId).get();
    dispatch({ type: GET_ORDER, payload: { id: order.id, ...order.data() } });
  };

  let listener;
  const getOrders = async (restaurantId) => {

    try {

      setLoading();

      listener = db.collection('orders')
        .where('restaurantId', '==', restaurantId)
        .orderBy("orderPlaced", "desc")
        .onSnapshot((values) => {
          let orders = [];
          values.forEach((doc) => {
            let order = {
              id: doc.id,
              ...doc.data(),
            };
            orders.push(order);
          });

          dispatch({ type: GET_ORDERS, payload: orders });
          calculateOrderCounts();
        });

    } catch (error) {
      console.log(error)
      dispatch({ type: GET_ORDERS, payload: [] });
    }


  };

  const changeStatus = async (id, status, user = null) => {
    try {
      setLoading();
      await ordersRef.doc(id).update({
        status,
        deliveredOn: status === "delivered" ? new Date().toISOString() : null,
        markedAsDeliveredBy: user
      });

      dispatch({ type: CHANGE_STATUS, payload: { id, status } });
    } catch (error) {
      console.log(error);
    }
  };

  const setOrderFilter = () => dispatch({ type: "SET" });

  const clearOrderFilter = () => dispatch({ type: "SET_CLEAR" });

  const setCurrentOrder = async (id) => {
    try {
      setLoading();
      await ordersRef.doc(id).onSnapshot((order) =>
        dispatch({
          type: SET_CURRENT_ITEM,
          payload: { id: order.id, ...order.data() },
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

  const filterOrders = (params) => {
    dispatch({ type: SEARCH_ORDERS, payload: params });
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
        stopListening,
        filterOrders,
        setOrderFilter,
        clearOrderFilter,
      }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrdersState;
