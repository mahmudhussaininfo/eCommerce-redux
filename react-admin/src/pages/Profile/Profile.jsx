import React, { useEffect, useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import Avatar from "../../assets/img/profiles/avatar-05.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/auth/authApiSlice";
import { createToast } from "../../utils/toast";
import { changePass } from "../../features/user/userApiSlice";
import {
  getAllPrmissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { error, message } = useSelector(getAllPrmissionData);
  //get logged in user details
  const { user } = useAuthUser();

  //update state
  const [edit, setEdit] = useState({
    name: user.name,
    email: user.email,
  });

  //password change state
  const [passinput, setPassinput] = useState({
    oldPass: "",
    newPass: "",
    conPass: "",
  });

  const handleSingleUser = () => {};

  //handle update input change
  const handleChange = (e) => {
    setEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handle input change for update
  const handlePasswordChange = (e) => {
    setPassinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name: edit.name, email: edit.email, id: user._id }));
    setEdit({ name: "", email: "" });

    // updateUser({ data: { name: edit.name, email: edit.email }, id: user._id })
  };

  //   <!-- handle change password form -->
  const handlePassFormSubmit = (e) => {
    e.preventDefault();
    if (!passinput.oldPass || !passinput.newPass || !passinput.conPass) {
      return createToast("All fields are required!", "warning");
    }
    if (passinput.newPass !== passinput.conPass)
      return createToast("Confirm Password not match!", "warning");
    dispatch(changePass({ id: user._id, data: passinput }));
    setPassinput({ oldPass: "", newPass: "", conPass: "" });
  };

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message]);

  return (
    <>
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="profile-header">
              <div className="row align-items-center">
                <div className="col-auto profile-image">
                  <a href="#">
                    <img
                      className="rounded-circle"
                      alt="User Image"
                      src={Avatar}
                    />
                  </a>
                </div>
                <div className="col ml-md-n2 profile-user-info">
                  <h4 className="user-name mb-0">{user?.name}</h4>
                  <h6 className="text-muted">{user?.email}</h6>
                  <div className="user-Location">
                    <i className="fa fa-map-marker" /> Florida, United States
                  </div>
                  <div className="about-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </div>
                </div>
                <div className="col-auto profile-btn">
                  <a href="#" className="btn btn-primary">
                    Edit
                  </a>
                </div>
              </div>
            </div>
            <div className="profile-menu">
              <ul className="nav nav-tabs nav-tabs-solid">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#per_details_tab"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#password_tab"
                  >
                    Password
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content profile-tab-cont"></div>
          </div>
        </div>

        <div className="tab-pane fade show active" id="per_details_tab">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between">
                    <span>Personal Details</span>
                    <a
                      className="edit-link"
                      data-toggle="modal"
                      href="#edit_personal_details"
                      onClick={handleSingleUser}
                    >
                      <i className="fa fa-edit mr-1" />
                      Edit
                    </a>
                  </h5>
                  <div className="row">
                    <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                      Name
                    </p>
                    <p className="col-sm-10">{user?.name}</p>
                  </div>
                  <div className="row">
                    <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                      Date of Birth
                    </p>
                    <p className="col-sm-10">24 Jul 1983</p>
                  </div>
                  <div className="row">
                    <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                      Email ID
                    </p>
                    <p className="col-sm-10">{user?.email}</p>
                  </div>
                  <div className="row">
                    <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                      Mobile
                    </p>
                    <p className="col-sm-10">305-310-5857</p>
                  </div>
                  <div className="row">
                    <p className="col-sm-2 text-muted text-sm-right mb-0">
                      Address
                    </p>
                    <p className="col-sm-10 mb-0">
                      4663 Agriculture Lane,
                      <br />
                      Miami,
                      <br />
                      Florida - 33165,
                      <br />
                      United States.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="edit_personal_details"
                aria-hidden="true"
                role="dialog"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Update your Profile</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleUpdateSubmit}>
                        <div className="row form-row">
                          <div className="col-md-12 col-sm-6">
                            <div className="form-group">
                              <label>Name</label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={edit?.name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-6">
                            <div className="form-group">
                              <label>Email ID</label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={edit?.email}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="password_tab" className="tab-pane fade">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Change Password</h5>
              <div className="row">
                <div className="col-md-10 col-lg-6">
                  <form onSubmit={handlePassFormSubmit}>
                    <div className="form-group">
                      <label>Old Password</label>
                      <input
                        type="password"
                        name="oldPass"
                        value={passinput.oldPass}
                        onChange={handlePasswordChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="newPass"
                        value={passinput.newPass}
                        onChange={handlePasswordChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="conPass"
                        value={passinput.conPass}
                        onChange={handlePasswordChange}
                        className="form-control"
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
