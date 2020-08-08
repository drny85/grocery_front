import React from "react";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import { withRouter } from "react-router-dom";
import Axios from "axios";

const OrderDetailsTop = (props) => {
	const { order, changeStatus, history } = props;
	const { orderNumber, status, totalAmount, orderType } = order;
	const { address, phone, email, name, lastName } = order.customer;

	const [newStatus, setStatus] = React.useState("");

	const modal = React.useRef();
	const sel = React.useRef();
	React.useEffect(() => {
		M.Modal.init(modal.current);
		M.FormSelect.init(sel.current);

		//eslint-disable-next-line
	}, [status]);
	console.log(status);

	const handleStatus = async () => {
		if (newStatus !== "") {
			changeStatus(order.id, newStatus);
			setStatus("");
			history.goBack();
		}

		if (newStatus === "delivered") {
			try {
				const result = Axios.post(
					"https://us-central1-grocery-409ef.cloudfunctions.net/sendNotification/sendNotification",
					{
						title: "Congratulations!",
						body: "Your order is on its way!",
						data: order,
						userId: order.userId,
					}
				);

				console.log((await result).data);
			} catch (error) {
				console.log(error.data);
			}
		}
	};

	return (
		<div className="card">
			<div className="card-content">
				<div className="row">
					<div className="col s4 pd-5">
						<h4 className="bold">Order # {orderNumber}</h4>
						<p className="capitalize bold">
							{name} {lastName}
						</p>
						{orderType === "delivery" ? (
							<>
								<p className="capitalize bold">
									{address.street} {address.apt && address.apt}
								</p>
								<p className="capitalize bold">
									{address.city}, {address.zipcode}
								</p>
								<p className="capitalize bold">{phone}</p>
								<p className="bold">{email && email}</p>
							</>
						) : (
							<p className="capitalize bold">{phone}</p>
						)}
					</div>
					<div className="col s8">
						<div className="total">
							<h5 className="bold">Order Total ${totalAmount}</h5>
							<br />
							<h4 className="capitalize">
								Status:{" "}
								<span
									className={`btn-rounded ${
										status === "new"
											? "new-status"
											: status === "in-progress"
											? "in-progress-status"
											: "delivered-status"
									}`}
								>
									{" "}
									{status}
								</span>{" "}
							</h4>
						</div>
						<div className="right">
							<button
								data-target="modal1"
								className="btn modal-trigger secondary"
							>
								Change Status
							</button>
							<div ref={modal} id="modal1" className="modal modal-fixed-footer">
								<div className="modal-content">
									<h4 className="capitalize center">
										Select the Right Status for this order
									</h4>
									<div className="input-field col s12">
										<select
											ref={sel}
											value={newStatus}
											onChange={(e) => setStatus(e.target.value)}
										>
											<option value="" disabled>
												Change Status
											</option>
											<option value="new">New</option>
											<option value="in progress">In Progress</option>
											<option value="delivered">Delivered</option>
										</select>
									</div>
									<br />
									<br />
									<div>
										<h6>
											<i className="material-icons">fiber_manual_record</i>
											Select In Progress when you have already started preparing
											this order
										</h6>
										<br />
										<h6>
											<i className="material-icons">fiber_manual_record</i>
											Select Delivered when you already finish preparing the
											order and has been delivered, otherwise, please keep it in
											progress
										</h6>
									</div>
								</div>
								<div className="modal-footer">
									<button
										style={{ marginRight: "20px", width: "30%" }}
										className="btn orange lg modal-close"
									>
										Cancel
									</button>
									<button
										style={{ marginRight: "20px", width: "30%" }}
										className="btn secondary lg modal-close"
										onClick={handleStatus}
									>
										Update
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

OrderDetailsTop.propTypes = {
	order: PropTypes.object.isRequired,
	changeStatus: PropTypes.func.isRequired,
};

export default withRouter(OrderDetailsTop);
