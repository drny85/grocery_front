import React from "react";
const Item = props => {
	const item = props.item;
	return (
		<div className="card medium">
			<div className="card-image">
				<img src={item.imageUrl} alt="" />
				<span className="card-title">{item.name}</span>
			</div>
			<div className="card-content">
				<p>{item.description}</p>
			</div>
			<div className="card-action">
				<p>{item.price}</p>
			</div>
		</div>
	);
};

export default Item;
