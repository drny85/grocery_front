import React, { useState, useContext, useEffect } from "react";
import CategoryContext from "../../context/category/categoryContext";
import M from "materialize-css/dist/js/materialize.min.js";
import { AllCategories } from "./AllCategories";

import AlertContext from "../../context/alerts/alertContext";
import Alerts from "../../components/Alerts";
import AddonsContext from "../../context/addons/addonsContext";

export const AddCategory = () => {
	//CONTEXTS START
	const alertContext = useContext(AlertContext);
	const addonsContext = useContext(AddonsContext);
	const { addons, getAddons } = addonsContext;
	const { setAlert } = alertContext;
	const categoryContext = useContext(CategoryContext);
	const {
		addCategory,
		error,
		current,
		categories,
		clearCategory,
		updateCategory,
		deleteCategory,
		clearCategoryError,
	} = categoryContext;

	//CONTEXTS END

	//STATES
	const [category, setCategory] = useState({ name: "" });

	const [isValid, setIsValid] = useState(true);

	const [itemAddons, setItemAddons] = useState("");

	//REFS
	const modal = React.useRef();
	const select = React.useRef();

	const checkDuplicate = () => {
		const valid = categories.find((c) => c.name === category.name);
		valid ? setIsValid(false) : setIsValid(true);
	};

	//HANDLERS --START
	const deleteHandler = () => {
		deleteCategory(current.id);
		setCategory({ name: "" });
		M.toast({ html: "Category Deleted", classes: "red ligthen-3" });
	};

	//HANDLERS --END
	useEffect(() => {
		M.FormSelect.init(select.current, {});

		M.Modal.init(modal.current, {});
		getAddons();

		if (current !== null) {
			setCategory({ name: current.name });

			console.log(current);
		} else {
			setCategory({ name: "" });
		}
		return () => {
			clearCategoryError();
		};
		//eslint-disable-next-line
	}, [current]);

	const nameHandler = (e) => {
		if (current !== null) {
			setCategory({ ...category, [e.target.name]: e.target.value });
		}

		setCategory({ ...category, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!isValid) {
			setAlert(`${category.name} already exists`, "danger");
			return;
		}
		if (category.name === "") {
			setAlert("Please enter a name", "danger");
			return;
		}

		if (current) {
			updateCategory({
				id: current.id,
				name: category.name,
			});

			M.toast({ html: "Category has been updated", classes: "blue-grey" });
		} else {
			addCategory({
				name: category.name,
			});
			setCategory({
				name: "",
			});
		}
	};

	return (
		<div>
			<div className="container">
				<br />
				<Alerts />

				<br />
				<h4 className="center">
					{!current ? "Add Category" : "Updating Category"}
				</h4>
				<div className="row">
					<form onSubmit={onSubmit} className="col s12">
						<div className="input-field col s12">
							<input
								type="text"
								style={{ textTransform: "capitalize" }}
								name="name"
								id="name"
								onBlur={checkDuplicate}
								value={category.name}
								className="validate"
								onChange={nameHandler}
								placeholder="Category name"
							/>
						</div>

						<button type="submit" className="btn blue-grey">
							{!current ? "Add Category" : "Update Category"}
						</button>
						{current ? (
							<>
								<button
									style={{ marginLeft: "20px", color: "black" }}
									className="btn blue-grey lighten-4"
									onClick={clearCategory}
								>
									Swith To Adding
									<i className="material-icons right">swap_horiz</i>
								</button>
								<button
									data-target="modal3"
									style={{ marginLeft: "20px", color: "black" }}
									className="btn red lighten-1 modal-trigger"
								>
									Delete
									<i className="material-icons right">delete</i>
								</button>
								<div ref={modal} id="modal3" className="modal">
									<div className="modal-content">
										<h4 className="center">
											Are you sure you want to delete this category?
										</h4>
									</div>
									<div className="modal-footer">
										<button className="btn grey mr-8 modal-close">
											Cancel
										</button>
										<button
											onClick={deleteHandler}
											className="btn red modal-close"
										>
											Delete
										</button>
									</div>
								</div>
							</>
						) : null}
					</form>
				</div>
			</div>
			<div className="categories">
				<AllCategories />
			</div>
		</div>
	);
};
