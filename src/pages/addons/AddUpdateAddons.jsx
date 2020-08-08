import React, { useEffect, useContext, useState } from "react";
import AddonsContext from "../../context/addons/addonsContext";
import AlertsContext from "../../context/alerts/alertContext";
import Alerts from "../../components/Alerts";
import AllAddons from "./AllAddons";
import M from "materialize-css/dist/js/materialize.min.js";

const AddUpdateAddons = props => {
	const addonsContex = useContext(AddonsContext);
	const alertsContex = useContext(AlertsContext);
	const { setAlert } = alertsContex;
	const {
		current,
		getAddons,
		clearAddonsError,
		clearAddon,
		addAddon,
		updateAddon
	} = addonsContex;
	const [name, setName] = useState({ name: "" });

	const onSubmit = e => {
		e.preventDefault();
		if (name.name === "") {
			setAlert("name is required", "danger");
		} else {
			if (current !== null) {
				updateAddon({
					id: current.id,
					...name
				});

				M.toast({ html: "Addon has been updated", classes: "green" });
				setName({ name: "" });
			} else {
				addAddon(name);
				M.toast({ html: "Addon has been added", classes: "green" });
				setName({ name: "" });
			}
		}
	};

	useEffect(() => {
		getAddons();

		if (current !== null) {
			setName({ name: current.name });
		} else {
			setName({ name: "" });
		}
		return () => {
			clearAddonsError();
		};
		//eslint-disable-next-line
	}, [current]);

	const nameHandler = e => {
		if (current !== null) {
			setName({ ...name, [e.target.name]: e.target.value });
		}

		setName({ ...name, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<div className="container">
				<br />
				<Alerts />

				<br />
				<h4 className="center">{!current ? "Add Addon" : "Updating Addon"}</h4>
				<div className="row">
					<form onSubmit={onSubmit} className="col s12">
						<div className="input-field col s12">
							<input
								type="text"
								style={{ textTransform: "capitalize" }}
								name="name"
								id="name"
								value={name.name}
								className="validate"
								onChange={nameHandler}
								placeholder="Category name"
							/>
						</div>

						<br />

						<button type="submit" className="btn blue-grey">
							{!current ? "Add Addon" : "Update Update"}
						</button>
						{current ? (
							<button
								style={{ marginLeft: "20px", color: "black" }}
								className="btn blue-grey lighten-4"
								onClick={clearAddon}
							>
								Swith To Adding
								<i className="material-icons right">swap_horiz</i>
							</button>
						) : null}
					</form>
				</div>
			</div>
			<div className="addons">
				<AllAddons />
			</div>
		</div>
	);
};

export default AddUpdateAddons;
