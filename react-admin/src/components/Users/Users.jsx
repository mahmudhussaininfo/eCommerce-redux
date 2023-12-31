import { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "datatables.net-dt";
import PageHeader from "../PageHeader/PageHeader";
import ModalPopup from "../ModalPopup/ModalPopup";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomPassword, timeAgo } from "../../helper/helper";
import { createToast } from "../../utils/toast";
import {
  getAllPrmissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import {
  createMamuUser,
  deleteMamuUser,
  statusMamuUserUpdate,
  userMamuUpdate,
} from "../../features/user/userApiSlice";
import swal from "sweetalert";

const Users = () => {
  const dispatch = useDispatch();
  const { user, role, error, message } = useSelector(getAllPrmissionData);

  const { input, handleChange, resetForm, setInput } = useFormFields({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  //for edit
  const [edit, setEdit] = useState("");

  //random password genarator
  const randomPass = generateRandomPassword(20);

  const handleRandomPassword = (e) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      password: randomPass,
    }));
  };

  //create User
  const handleUserSubmit = (e) => {
    e.preventDefault();
    dispatch(createMamuUser(input));
    resetForm();
  };

  //status update
  const handleStautsUpdate = (status, id) => {
    dispatch(statusMamuUserUpdate({ status, id }));
  };

  //handle Delate
  const handleDelate = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteMamuUser(id));
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //handle User delete
  const handleUserEdit = (id) => {
    const findUser = user.find((data) => data._id === id);
    setEdit(findUser);
  };

  //handle change for user edit
  const handleUserEditChange = (e) => {
    setEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // user edit submit handler
  const handleUserEditSubmit = (e) => {
    e.preventDefault();
    dispatch(
      userMamuUpdate({
        id: edit._id,
        name: edit.name,
        email: edit.email,
        role: edit.role,
      })
    );
    setEdit({
      name: "",
      email: "",
      role: "",
    });
  };

  useEffect(() => {
    new DataTable(".mamutable");
  });

  useEffect(() => {
    if (error) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);
  return (
    <>
      <div className="page-header">
        <ModalPopup target="userPopup" title="Add users">
          <form action="" onSubmit={handleUserSubmit}>
            <div className="my-3">
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Password</label>
              <input
                type="text"
                name="password"
                value={input.password}
                onChange={handleChange}
                className="form-control"
              />
              <a
                href=""
                className="badge badge-info"
                onClick={handleRandomPassword}
              >
                Random Password
              </a>
            </div>
            <div className="my-3">
              <select
                name="role"
                id=""
                className="form-control"
                value={input.role}
                onChange={handleChange}
              >
                <option value="">--selected--</option>
                {role?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="my-3">
              <input type="submit" className="btn btn-primary btn-block" />
            </div>
          </form>
        </ModalPopup>

        <ModalPopup target="userEdit" title="Update User">
          <form action="" onSubmit={handleUserEditSubmit}>
            <div className="my-3">
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                value={edit.name}
                onChange={handleUserEditChange}
                className="form-control"
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                value={edit.email}
                onChange={handleUserEditChange}
                className="form-control"
              />
            </div>
            <div className="my-3">
              <select
                name="role"
                id=""
                className="form-control"
                value={edit.role}
                onChange={handleUserEditChange}
              >
                <option value="">--selected--</option>
                {role?.map((item, index) => {
                  return (
                    <option value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="my-3">
              <input type="submit" className="btn btn-primary btn-block" />
            </div>
          </form>
        </ModalPopup>
        <PageHeader title="User" />
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              data-target="#userPopup"
              data-toggle="modal"
            >
              Add New Users
            </button>
            <br /> <br />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  {user && (
                    <table className="mamutable table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>1</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>At a Time</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...user].reverse().map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item?.role?.name}</td>
                              <td>{timeAgo(item.createdAt)}</td>
                              <td style={{ width: "220px" }}>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="status_1"
                                    className="check"
                                    checked={item.status ? true : false}
                                  />
                                  <label
                                    onClick={() =>
                                      handleStautsUpdate(item.status, item._id)
                                    }
                                    htmlFor="status_1"
                                    className="checktoggle"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="text-right">
                                <button
                                  data-toggle="modal"
                                  data-target="#userEdit"
                                  onClick={() => handleUserEdit(item._id)}
                                >
                                  <BiEdit />
                                </button>
                                &nbsp;
                                <button onClick={() => handleDelate(item._id)}>
                                  <BsTrashFill />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
