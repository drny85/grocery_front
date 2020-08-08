import React from "react";
import PropTypes from "prop-types";

import { Loader } from "./Loader";
import Order from "./Order";
import OrdersContext from '../context/orders/ordersContext';
import {withRouter} from 'react-router-dom'


const OrdersByStatus = (props) => {
    const {status} = props;
    const ordersContex = React.useContext(OrdersContext);
    const {loading, orders} = ordersContex;
    
	if (loading) {
		return <Loader />;
    }

    //return <Order key={doc.id} order={order} orderId={doc.id} />;

	return (
		<div>
            <h5 className="center bold">{status === 'new' ? `New Orders` : status === 'in progress' ? 'In Progress': 'Delivered'} <span>({(orders.filter(order => (order.status === status))).length })</span> </h5>
            {(orders.filter(order => (order.status === status))).length === 0 ? (<div className="center bold">No Orders</div>) :
			orders.filter(order => order.status === status).map(order => {
                
                return <Order key={order.id} order={order} orderId={order.id} />;
            })}
        </div>

	);
};

OrdersByStatus.propTypes = {
	status: PropTypes.string.isRequired
};

export default withRouter(OrdersByStatus);
