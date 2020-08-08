import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import OrdersContext from "../context/orders/ordersContext";
import { withRouter } from "react-router-dom";

const Order = (props) => {
	const { order, orderId, history } = props;
	const { street, city } = order.customer.address;
	const { name, lastName } = order.customer;
	const { status, totalAmount, orderNumber, orderType } = order;

	const ordersContext = React.useContext(OrdersContext);
	const { setCurrentOrder } = ordersContext;

	const goToOrderDetails = () => {
		setCurrentOrder(orderId);
		history.push(`/order/details`);
	};

	React.useEffect(() => {
		return () => {};

		//eslint-disable-next-line
	}, []);

	return (
		<div
			style={{ cursor: "pointer" }}
			onClick={goToOrderDetails}
			className={`card ${
				status === "new"
					? "blue"
					: status === "in progress"
					? "yellow"
					: "green"
			}
	`}
		>
			<div className={`col s12 m12 `}>
				<div
					className={`card ${
						status === "new"
							? "light-blue darken-4"
							: status === "in progress"
							? "yellow darken-4"
							: "green lighten-1"
					}`}
				>
					<div className="card-content white-text">
						<div>
							<div className="row">
								<div className="col s8">
									<h3>Order # {orderNumber}</h3>
								</div>
								<div className="col s4">
									<h5 className="rigth">Items: {order.items.length}</h5>
								</div>
							</div>
						</div>
						{orderType === "delivery" ? (
							<span className="card-title capitalize">
								{street}, {city}
							</span>
						) : (
							<span className="card-title capitalize">
								Order Type: {orderType}
							</span>
						)}

						<div className="row">
							<div className="col s7">
								<h6 className="capitalize">
									{name} {lastName}
								</h6>
							</div>
							<div className="col">
								<h5 className="rigth">${totalAmount}</h5>
							</div>
						</div>
						<div>
							<h6>
								Order Received On:{" "}
								{order.orderPlaced && moment(order.orderPlaced).format("lll")} (
								{order.orderPlaced && moment(order.orderPlaced).fromNow()})
							</h6>
						</div>
					</div>
					<div className={`card-action ${status === "new" ? "pulse" : ""}`}>
						<div className="center text-uppercase-white bold ">{status}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Order.propTypes = {
	orderId: PropTypes.string,
	order: PropTypes.object,
};

export default withRouter(Order);
