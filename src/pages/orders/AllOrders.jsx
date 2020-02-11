import React from "react";
import OrdersByStatus from "../../components/OrdersByStatus";
import OrdersContext from "../../context/orders/ordersContext";

const AllOrders = () => {

	const ordersContext = React.useContext(OrdersContext);
	const {names, getNames} = ordersContext;
	console.log(names);

	React.useEffect(() => {
		getNames();
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
				</div><div className="col s4">
				<OrdersByStatus status="delivered" />
				</div>
			</div>
		</div>
	);
};

export default React.memo(AllOrders);
