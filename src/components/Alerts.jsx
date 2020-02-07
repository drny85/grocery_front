import React, { useContext } from "react";
import AlertContext from "../context/alerts/alertContext";

const Alerts = () => {
	const alertContexr = useContext(AlertContext);
	const { alerts } = alertContexr;
	return (
		alerts.length > 0 &&
		alerts.map(alert => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				{alert.msg}
			</div>
		))
	);
};

export default Alerts;
