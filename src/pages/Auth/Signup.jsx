import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import Alerts from "../../components/Alerts";
import AlertContext from "../../context/alerts/alertContext";
import { withRouter } from "react-router-dom";

const Signup = props => {
	const [mode, setMode] = useState("login");
	const [account, setAccount] = useState({
		name: "",
		lastname: "",
		email: "",
		password: "",
		confirm: ""
	});

	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const { setAlert } = alertContext;
	const { signup, setError, setUser, login, setLogin, user } = authContext;
	console.log(new Date().getTime());

	React.useEffect(() => {
		if (user) {
			props.history.push("/");
		}
	});

	const setValue = e => {
		setAccount({ ...account, [e.target.name]: e.target.value });
	};

	const onSubmit = async e => {
		e.preventDefault();
		if (mode === "signup") {
			if (account.name === "") {
				setAlert("please enter name", "danger");
			}
			if (account.lastname === "") {
				setAlert("please enter last name", "danger");
			}
			if (account.email === "") {
				setAlert("please enter an email", "danger");
			}
			if (account.password === "") {
				setAlert("please enter password", "danger");
			} else if (account.password.length < 6) {
				setAlert("password must be at least 6 characters long", "danger");
			} else if (account.password.trim() !== account.confirm.trim()) {
				setAlert("password does not match", "danger");
			} else {
				try {
					const u = await signup(account.email, account.password);
					setUser({
						uid: u.user.uid,
						email: u.user.email,
						createdAt: new Date().getTime()
					});
				} catch (error) {
					setError(error);
					setAlert(error.message, "danger");
				}
			}
		} else {
			if (account.email === "") {
				setAlert("please enter an email", "danger");
			}
			if (account.password === "") {
				setAlert("please enter password", "danger");
			} else if (account.password.length < 6) {
				setAlert("password must be at least 6 characters long", "danger");
			} else {
				//handle login
				try {
					const u = await login(account.email, account.password);
					console.log(u);
					setLogin({
						uid: u.user.uid,
						email: u.user.email
					});
				} catch (error) {
					setError(error);
					setAlert(error.message, "danger");
				}
			}
		}
	};

	const switchMode = () => {
		if (mode === "login") {
			setMode("signup");
		} else {
			setMode("login");
		}
	};

	return (
		<div className="center-div">
			<Alerts />
			<h4 className="center">{mode === "signup" ? "Sign Up" : "Login"}</h4>
			<br />
			<div className="card blue-grey z-depth-3">
				<div className="card-content">
					<div className="row">
						<form onSubmit={onSubmit} className="col s12">
							{mode === 'signup' ?
							<div className="row">
								<div className="col s6 m6">
									<div className="input-field">
										<input
											type="text"
											style={{ fontSize: "1.5rem" }}
											value={account.name}
											name="name"
											onChange={setValue}
											className="validate white-text"
											placeholder="First Name"
										/>
									</div>
								</div>
								<div className="col s6 m6">
									<div className="input-field">
										<input
											type="text"
											style={{ fontSize: "1.5rem" }}
											value={account.lastname}
											name="lastname"
											onChange={setValue}
											className="validate white-text"
											placeholder="Last Name"
										/>
									</div>
								</div>
							</div>
							: null }

							<div className="input-field">
								<input
									type="text"
									style={{ fontSize: "1.5rem" }}
									value={account.email}
									name="email"
									onChange={setValue}
									className="validate white-text"
									placeholder="Email"
								/>
							</div>
							<div className="input-field">
								<input
									style={{ fontSize: "1.5rem" }}
									type="password"
									value={account.password}
									onChange={setValue}
									name="password"
									placeholder="Password"
								/>
							</div>
							{mode === "signup" ? (
								<div className="input-field">
									<input
										style={{ fontSize: "1.5rem" }}
										type="password"
										value={account.confirm}
										onChange={setValue}
										name="confirm"
										placeholder="Confirm Password"
									/>
								</div>
							) : null}
							<div className="">
								<button
									style={{ width: "10rem" }}
									className="btn grey"
									type="submit"
								>
									{mode !== "login" ? "Sign Up" : "Login"}
								</button>
							</div>
							<br />
						</form>
						<div className="rig">
							<p style={{ paddingRight: "20px" }} className="mr-10">
								{mode === "login" ? "Need an account ? " : "Have an account ? "}
								<span>
									<button
										style={{
											fontWeight: "bold",
											color: "white",
											letterSpacing: 1.5
										}}
										onClick={switchMode}
										className="waves-effect waves-teal btn-flat blue-grey"
									>
										{mode === "login" ? "Sign Up" : "Login"}
									</button>
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Signup);
