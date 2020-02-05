import React, { useState, useContext, useEffect, useRef } from "react";
import { storage } from "../../services/firebase";
import FileUploader from "react-firebase-file-uploader";
import M from "materialize-css/dist/js/materialize.min.js";
import ItemsContext from "../../context/items/itemsContext";
import CategoryContext from "../../context/category/categoryContext";
import { withRouter } from "react-router-dom";

const AddUpdateItem = props => {
	const itemsContext = useContext(ItemsContext);
	const categoryContext = useContext(CategoryContext);
	const { categories, getCategories } = categoryContext;
	const {
		addItem,
		current,
		updateItem,
		clearCurrent,
		deleteItem
	} = itemsContext;
	const modal = useRef();

	const [item, setItem] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		available: true
	});

	const handleDelete = () => {
		deleteItem(current.id);
		props.history.push("/all-items");
	};

	useEffect(() => {
		if (current !== null) {
			M.Modal.init(modal.current);
			setItem(current);
			setImage(current.imageUrl);
		} else {
		}
		getCategories();

		return () => {
			clearCurrent();
		};

		//eslint-disable-next-line
	}, [current]);

	const [image, setImage] = useState("");
	const placeholderImage =
		"data:image/png;base64,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";

	//const [isValid, setIsvalid] = useState(false);

	const setValue = e => {
		setItem({ ...item, [e.target.name]: e.target.value });
		console.log(item.category);
	};

	const handleImage = async e => {
		const image = e.target.files[0];
		setImage(image);
	};

	const onSubmit = async e => {
		e.preventDefault();

		if (current !== null) {
			// handle update item
			const updated = {
				id: current.id,
				name: item.name,
				description: item.description,
				price: parseFloat(item.price),
				category: item.category,
				imageUrl: image,
				available: true
			};

			updateItem(updated);
			if (updated.id !== null) {
				setItem({
					name: "",
					price: "",
					description: "",
					category: "",
					available: true
				});
				M.toast({ html: "Item has been updated!", classes: "green lighten-2" });
				setImage("");
				clearCurrent();
				props.history.goBack();
			}
		} else {
			const added = {
				name: item.name,
				description: item.description,
				price: parseFloat(item.price),
				category: item.category,
				imageUrl: image,
				available: true
			};

			addItem(added);

			if (added.id !== null) {
				setItem({
					name: "",
					price: "",
					description: "",
					category: "",
					available: true
				});
				M.toast({ html: "Item has been added!", classes: "blue-grey" });
				setImage("");
			}
		}

		// console.log(items);
	};

	const handleUploadSuccess = filename => {
		storage
			.ref("images")
			.child(filename)
			.getDownloadURL()
			.then(url => setImage(url));
	};

	return (
		<div className="container">
			<br />
			<div className="row">
				<div
					className={
						image === "" && item.name === "" ? "col s12 m12" : "col s12 m7"
					}
				>
					<div className="card">
						{current ? (
							<>
								<button
									style={{ float: "right", margin: "20px" }}
									data-target="modal1"
									className="btn red modal-trigger"
								>
									Delete Item
								</button>
							</>
						) : null}

						<div className="card-content">
							<div ref={modal} id="modal1" className="modal">
								<div className="modal-content">
									<h4 className="center">
										Are you sure you want to delete this item?
									</h4>
								</div>
								<div className="modal-footer">
									<button className="btn grey mr-8 modal-close">Cancel</button>
									<button
										onClick={handleDelete}
										className="btn red modal-close"
									>
										Delete
									</button>
								</div>
							</div>

							<div>
								<h3 className="card-title bold">
									{current ? "Update Item" : "Add Item"}
								</h3>
							</div>

							<div className="form">
								<form onSubmit={onSubmit}>
									<div className="col s12">
										<div className="input-field">
											<input
												id="name"
												style={{ textTransform: "capitalize" }}
												type="text"
												name="name"
												required
												value={item.name}
												onChange={setValue}
												className="validate"
											/>
											<label className="active" htmlFor="name">
												Item Name
											</label>
										</div>
										<div className="input-field">
											<input
												id="description"
												type="text"
												name="description"
												value={item.description}
												required
												onChange={setValue}
												className="validate"
											/>
											<label className="active" htmlFor="description">
												Description
											</label>
										</div>

										<div className="input-field">
											<input
												id="price"
												type="number"
												name="price"
												value={item.price}
												step="0.01"
												required
												onChange={setValue}
												min="0"
												className="validate"
											/>
											<label className="active" htmlFor="price">
												Price
											</label>
										</div>

										<div className="file-field input-field">
											<div className="btn blue-grey">
												<span>Upload Image</span>
												<input type="file" name="image" id="image" />
											</div>
											<div className="file-path-wrapper">
												<input
													type="text"
													placeholder="Pick an image"
													value={image}
													onChange={handleImage}
													className="file-path validate"
												/>
											</div>
											<FileUploader
												accept="image/*"
												name="avatar"
												randomizeFilename
												storageRef={storage.ref("images")}
												onUploadSuccess={handleUploadSuccess}
											/>
										</div>
									</div>
									<div className="input-field col s12">
										<select
											className="browser-default"
											value={item.category}
											name="category"
											onChange={setValue}
										>
											<option value="">Choose a category</option>

											{categories.map(category => (
												<option
													style={{ textTransform: "capitalize" }}
													onChange={setValue}
													key={category.id}
													value={category.name}
												>
													{category.name}
												</option>
											))}
										</select>
									</div>
									<div className="submit-btn">
										<button
											type="submit"
											className="waves-effect waves-light btn btn-block black"
										>
											{current ? "Update Item" : "Add Item"}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				{image === "" && item.name === "" ? null : (
					<div className="col s12 m5">
						<div className="row">
							<div className="card">
								<div className="card-image">
									<img src={image === "" ? placeholderImage : image} alt="" />
									<span
										style={{ textTransform: "capitalize", fontWeight: "bold" }}
										className="card-title text-capitalize"
									>
										{item.name}
									</span>
								</div>
								<div className="card-content">
									<p style={{ textTransform: "capitalize" }}>
										{item.description}
									</p>
								</div>
								{item.price === "" ? null : (
									<div className="card-action">
										<h6 style={{ fontSize: "2.1rem", fontWeight: "bold" }}>
											$ {item.price}
										</h6>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default withRouter(AddUpdateItem);