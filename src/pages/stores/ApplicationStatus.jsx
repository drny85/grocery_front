import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import authContext from "../../context/auth/authContext";

const ApplicationStatus = (props) => {
  const { user } = useContext(authContext);
  useEffect(() => {
    if (user?.store !== "pending") {
      props.history.replace("/");
    }
  }, [user, props.history]);
  return (
    <div className="container">
      <div className="info_status">
        <h4 className="center">
          Hi <span className="capitalize">{user?.name},</span> here is your
          application status
        </h4>
        <h3 className="center">Status: {user?.store}</h3>
        <p>
          If you think that you status should be already approved, please
          contact the administrator. Thanks!
        </p>
      </div>
    </div>
  );
};

export default ApplicationStatus;
