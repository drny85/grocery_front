import React from "react";

import { withRouter } from "react-router-dom";
import { useContext } from "react";
import authContext from "../context/auth/authContext";

const Item = ({ item, history }) => {
	const { user } = useContext(authContext);
	const navigateToItem = () => {
		history.push(`/item/${item.id}`);
	};
	return (
		<div className="card medium">
			<div style={{ height: "100%" }} className="card-image">
				<img
					style={{ minHeight: "280px", height: "auto" }}
					src={item.imageUrl}
					alt=""
				/>
				<span className="card-title bold capitalize" style={{ color: "black" }}>
					{item.name}
				</span>
			</div>
			<div
				style={{ minHeight: "2rem", height: "2rem" }}
				className="card-content"
			>
				<p style={{ textTransform: "capitalize" }}>{item.description}</p>
			</div>
			<div className="card-action">
				<div className="row">
					<div className="col s9">
						<p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
							{item.sizes
								? `As low as $${item.price[item.sizes[0]]}`
								: item.price.toFixed(2)}
						</p>
					</div>
					<div className="col s3">
						{item.available ? (
							<p style={{ color: "green" }}>
								Available <i className="material-icons">check</i>
							</p>
						) : (
								<p style={{ color: "red" }}>
									Not Available <i className="material-icons">close</i>
								</p>
							)}
					</div>
					<br />
					{user.isAdmin && (
						<button onClick={navigateToItem} className="btn orange">
							Edit <i className="material-icons right">edit</i>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

// @ts-ignore
export default withRouter(Item);
