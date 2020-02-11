import React from "react";
import PropTypes from "prop-types";

const OrdersList = ({ items, total, orderId }) => {
  console.log(items);
	return <div></div>;
};

OrdersList.propTypes = {
	items: PropTypes.array,
	total: PropTypes.number,
	orderId: PropTypes.string
};

export default OrdersList;
