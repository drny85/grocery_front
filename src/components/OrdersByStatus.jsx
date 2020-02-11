import React from "react";
import PropTypes from "prop-types";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../services/firebase";
import { Loader } from "./Loader";
import Order from "./Order";

const OrdersByStatus = ({ status }) => {
	const [values, loading, error] = useCollection(
		db
            .collection("orders")
            .where('status', '==', status),
           
		{
			snapshotListenOptions: { includeMetadataChanges: true }
		}
    );
    
	if (loading) {
		return <Loader />;
	}

	return (
		<div>
            <h5 className="center bold">{status === 'new' ? 'New Orders' : status === 'in progress' ? 'In Progress': 'Delivered'}</h5>
			{error && <strong>Could not load orders</strong>}
			{loading && <Loader />}
			{values &&
				values.docs.map(doc => {
					const order = doc.data();

					return <Order key={doc.id} order={order} orderId={doc.id} />;
				})}
		</div>
	);
};

OrdersByStatus.propTypes = {
	status: PropTypes.string.isRequired
};

export default OrdersByStatus;
