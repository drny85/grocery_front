import React from "react";

import "./OrderSearch.css";

const OrderSearch = ({ value, onChange }) => {
	return (
		<div className="orderSearch">
			<input
				type="text"
				placeholder="Search order by customer's name, phone, etc"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default OrderSearch;
