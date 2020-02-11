import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import OrdersContext from "../context/orders/ordersContext";

const Order = ({ order, orderId }) => {
	const { street, city } = order.customer.address;
	const { name, lastName } = order.customer;
	const { status, totalAmount } = order;

	const ordersContext = React.useContext(OrdersContext);
	const { setCurrentOrder, clearCurrent } = ordersContext;

	const goToOrderDetails = () => {
		console.log(orderId);
		setCurrentOrder(orderId);
	};

	React.useEffect(() => {
		return () => {
			clearCurrent();
		};

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
						<span className="card-title capitalize">
							{street} {city}
						</span>
						<div className="row">
							<div className="col s7">
								<h6 className="capitalize">
									{name}, {lastName}
								</h6>
							</div>
							<div className="col">
								<h5 className="rigth">${totalAmount}</h5>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button className={`btn ${status === "new" ? "pulse" : ""}`}>
							{status}
						</button>
						<button className={`btn right grey darken-2`}>
							Preview Order <i className="fa fa-eye" aria-hidden="true"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

Order.propTypes = {
	orderId: PropTypes.string,
	order: PropTypes.object
};

export default React.memo(Order);
