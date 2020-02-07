import React, {useState} from "react";

export const Signup = () => {

    const [user, setUser] = useState({
        email:  '',
        password: '',
        confirm: ''
    })

    const setValue = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
		
	};
	console.log(user);
	return (
		<div className="center-div">
			<div className="card blue-grey z-depth-3">
				<div className="card-content">
					<div className="row">
						<form className="col s12">
							<div className="input-field">
								<input type="text" style={{fontSize: '1.5rem'}} value={user.email} name="email" onChange={setValue} className="validate white-text" placeholder="Email" />
							</div>
                            <div className="input-field">
								<input style={{fontSize: '1.5rem'}} type="password" value={user.password}  onChange={setValue} name="passowrd" placeholder="Password" />
							</div>
                            <div className="input-field">
								<input style={{fontSize: '1.5rem'}} type="password" value={user.confirm}  onChange={setValue} name="confirm" placeholder="Confirm Password" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
