import { useContext, useEffect } from "react";
import ordersContext from "../context/orders/ordersContext";
import moment from "moment";
import authContext from "../context/auth/authContext";

const useDatedOrders = (startDate = new Date(), endDate = new Date()) => {
	const { orders, getOrders } = useContext(ordersContext);
	const { user } = useContext(authContext)
	const start = moment(startDate).startOf("day");
	const end = moment(endDate).endOf("day");

	const sorted = orders.filter(
		(order) =>
			moment(order.orderPlaced).isAfter(start) &&
			moment(order.orderPlaced).isBefore(end)
	);

	useEffect(() => {
		getOrders(user?.store);

		// eslint-disable-next-line
	}, []);

	return sorted;
};

export default useDatedOrders;
