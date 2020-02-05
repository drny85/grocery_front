import React, { useState, useContext, useEffect } from "react";
import CategoryContext from "../../context/category/categoryContext";
import M from "materialize-css/dist/js/materialize.min.js";
import { AllCategories } from "./AllCategories";

export const AddCategory = () => {
	const [localError, setLocalError] = useState("");
	const [name, setName] = useState({ name: "" });

	const categoryContext = useContext(CategoryContext);
	const {
		addCategory,
		error,
		category,
		clearCategory,
		updateCategory,
		clearCategoryError,
	} = categoryContext;

	useEffect(() => {
		if (category !== null) {
			
			setName(category);
		} else {
			
			setName({
				name: ""
			});
		}
		return () => {
			clearCategoryError();
		}
		//eslint-disable-next-line
	}, [category])

	const nameHandler = e => {
		if (category !== null) {
			console.log("AGAIN");
			setName({ ...name, [e.target.name]: e.target.value });
		}
		let value = e.target.value;
		setName({ ...name, [e.target.name]: e.target.value });
		if (value.length < 3) {
			setLocalError("Name must be greater than 3 characters");
		} else {
			setLocalError("");
		}
	};

	const onSubmit = e => {
		e.preventDefault();
		if (category) {
			updateCategory({
				id: category.id,
				name: name.name
			});
			setName({
				name: ""
			});
			
			M.toast({ html: "Category has been updated", classes: "blue-grey" });
		} else {
			addCategory(name);
			setName({
				name: ""
			});
			M.toast({ html: "Category has been added", classes: "blue-grey" });
		} 
	};

	return (
		<div>
			<div className="container">
				<br />
				{error ? <div className="error red">{error}</div> : null}
				<br />
				<h4 className="center">
					{!category ? "Add Category" : "Updating Category"}
				</h4>
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
						<div>
							<p className="red-text">{localError}</p>
						</div>
						<button type="submit" className="btn blue-grey">
							{!category ? "Add Category" : "Update Category"}
						</button>
						{category ? (
							<button
								style={{ marginLeft: "20px", color: "black" }}
								className="btn blue-grey lighten-4"
								onClick={clearCategory}
							>
								Swith To Adding
								<i className="material-icons right">swap_horiz</i>
							</button>
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
