import React from "react";
const Item = props => {
	const item = props.item;
	return (
		<div className="card medium">
			<div className="card-image">
				<img style={{minHeight: "280px", height: "auto"}} src={item.imageUrl} alt="" />
				<span className="card-title" style={{textTransform: "capitalize"}}>{item.name}</span>
			</div>
			<div className="card-content">
				<p style={{textTransform: "capitalize"}}>{item.description}</p>
			</div>
			<div className="card-action">
				<p style={{fontWeight:"bold", fontSize: "1.5rem"}}>$ {item.price}</p>
			</div>
		</div>
	);
};

export default Item;
