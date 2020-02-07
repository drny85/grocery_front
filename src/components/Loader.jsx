import React from "react";
import spinner from "../loading.gif";
import "../index.css";

export const Loader = () => {
	return (
		<div className="loading-spinner">
			<img className="loading_img" src={spinner} alt="" />
		</div>
	);
};
