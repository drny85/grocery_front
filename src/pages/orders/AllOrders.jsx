import React from "react";
import OrdersByStatus from "../../components/OrdersByStatus";
import OrdersContext from "../../context/orders/ordersContext";
import NotificationContext from "../../context/notifications/notificationContext";


const AllOrders = () => {
	const ordersContext = React.useContext(OrdersContext);
	const { getOrders, stopListening } = ordersContext;
	const notificationContext = React.useContext(NotificationContext);
	const { removeNotification, setNotification } = notificationContext;
	


	React.useEffect(() => {
		getOrders();
		setNotification();

		return () => {
			stopListening();
			removeNotification();
			clearInterval()
		};
		//eslint-disable-next-line
	}, []);
	

	return (
		<div className="orders">
			<h3 className="center">All Orders</h3>
			<br />

			<div className="row">
				<div className="col s4">
					<OrdersByStatus status="new" />
				</div>
				<div className="col s4">
					<OrdersByStatus status="in progress" />
				</div>
				<div className="col s4">
					<OrdersByStatus status="delivered" />
				</div>
			</div>
		</div>
	);
};

export default React.memo(AllOrders);
