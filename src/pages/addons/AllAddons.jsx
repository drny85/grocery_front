import React, { useEffect, useContext } from "react";
import AddonsContext from "../../context/addons/addonsContext";
import { Link } from "react-router-dom";

const AllAddons = props => {
	const addonsContext = useContext(AddonsContext);
	const {
		getAddons,
		addons,
		setAddon,
		clearAddon
	} = addonsContext;

	useEffect(() => {
		getAddons()

		return () => {
			clearAddon()
		};
		//eslint-disable-next-line
	}, []);
	return (
		<div className="container">
			<br />
			<ul className="collection with-header">
				<li className="collection-header">
					<h4>All Addons</h4>
				</li>
				{addons.length > 0 ? (
					addons.map(addon => (
						<li key={addon.id} className="collection-item">
							<div style={{ textTransform: "capitalize" }}>
								{addon.name}
								<Link
									to="#"
									onClick={() => setAddon(addon.id)}
									className="secondary-content"
								>
									<i className="material-icons">edit</i>
								</Link>
							</div>
						</li>
					))
				) : (
					<div className="center">No Addons</div>
				)}
			</ul>
		</div>
	);
};

export default AllAddons;
