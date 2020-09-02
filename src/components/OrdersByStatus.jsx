import React from "react";
import PropTypes from "prop-types";

import { Loader } from "./Loader";
import Order from "./Order";
import OrdersContext from "../context/orders/ordersContext";
import { withRouter } from "react-router-dom";
import useDatedOrders from "../utils/useDatedOrders";

const OrdersByStatus = (props) => {
	const { status, start, end } = props;

	const ordersContex = React.useContext(OrdersContext);
	const { loading, filtered } = ordersContex;
	const orders = useDatedOrders(start, end);

	if (loading) {
		return <Loader />;
	}

	//return <Order key={doc.id} order={order} orderId={doc.id} />;

	return (
		<div>
			<h5 className="center bold">
				{status === "new"
					? `New Orders`
					: status === "in progress"
					? "In Progress"
					: "Delivered"}{" "}
				<span>
					({orders.filter((order) => order.status === status).length})
				</span>{" "}
			</h5>
			{orders.filter((order) => order.status === status).length === 0 ? (
				<div className="center bold">No Orders</div>
			) : filtered.length > 0 ? (
				filtered
					.filter((order) => order.status === status)
					.map((order) => {
						return <Order key={order.id} order={order} orderId={order.id} />;
					})
			) : (
				orders
					.filter((order) => order.status === status)
					.map((order) => {
						return <Order key={order.id} order={order} orderId={order.id} />;
					})
			)}
		</div>
	);
};

OrdersByStatus.propTypes = {
	status: PropTypes.string.isRequired,
};

export default withRouter(OrdersByStatus);
