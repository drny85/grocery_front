import React from "react";
import PropTypes from "prop-types";

const ItemsListDetails = ({ items }) => {
	return (
		<div>
			<table className="responsive-table">
				<thead>
					<tr className="grey lighten-2">
						<th>Image</th>
						<th>Item Name</th>
						<th>Price</th>
						<th>Qty</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody className="bold">
					{items.map((item, i) => {
						return (
							<tr key={i}>
								<td>
									<img
										style={{ borderRadius: "10px" }}
										className=""
										width={items.length > 4 ? "100" : "150"}
										height={items.length > 4 ? "80" : "120"}
										src={item.imageUrl}
										alt=""
									/>
								</td>
								<td className="capitalize">
									<div>{item.name}</div>
									<br />
									<div>
										<i>{item.instruction}</i>
									</div>
								</td>
								<td>$ {item.price}</td>
								<td>{item.quantity}</td>
								<td>${(item.price * item.quantity).toFixed(2)}</td>
							</tr>
						);
					})}
				</tbody>
				<tfoot></tfoot>
			</table>
		</div>
	);
};

ItemsListDetails.propTypes = {
	items: PropTypes.array.isRequired,
};

export default ItemsListDetails;
