import { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "datatables.net-dt";
import PageHeader from "../PageHeader/PageHeader";
import ModalPopup from "../ModalPopup/ModalPopup";
import useFormFields from "../../hooks/useFormFields";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPrmissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { createToast } from "../../utils/toast";
import {
  createRoles,
  deleteRole,
  roleUpdate,
  statusRoleUpdate,
} from "../../features/user/userApiSlice";
import { timeAgo } from "../../helper/helper";
import swal from "sweetalert";

const Roles = () => {
  const dispatch = useDispatch();
  const { input, handleChange, resetForm } = useFormFields({
    name: "",
  });

  const { permission, role, error, message } = useSelector(getAllPrmissionData);

  const [selected, setSelected] = useState([]);

  const [edit, setEdit] = useState("");

  //handleRole Edit
  const handleRoleEdit = (id) => {
    const findRole = role.find((data) => data._id === id);
    console.log(findRole);
    setEdit(findRole);
    setSelected(findRole.permissions);
  };

  //handle change for role edit
  const handleRoleEditChange = (e) => {
    setEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // role edit submit handler
  const handleRoleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(
      roleUpdate({
        id: edit._id,
        name: edit.name,
        permissions: selected,
      })
    );
  };

  //handle Submit
  const handleRoleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createRoles({
        name: input.name,
        permissions: [...selected],
      })
    );
    resetForm();
    setSelected([]);
  };

  //handle Delete
  const handleDelate = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteRole(id));
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const handleCheckboxChange = (e) => {
    const val = e.target.value;
    const updateList = [...selected];
    if (selected.includes(val)) {
      updateList.splice(selected.indexOf(val), 1);
    } else {
      updateList.push(val);
    }
    setSelected(updateList);
  };

  //status update
  const handleStautsUpdate = (status, id) => {
    dispatch(statusRoleUpdate({ status, id }));
  };

  useEffect(() => {
    new DataTable(".mamutable");
  });

  useEffect(() => {
    if (error && role) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message && role) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, role]);

  return (
    <>
      <div className="page-header">
        <ModalPopup target="userRolePopup" title="permission">
          <form action="" onSubmit={handleRoleSubmit}>
            <div className="my-3">
              <label htmlFor="">Role Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="my-2">
              <label htmlFor="">Permission</label>
              {permission &&
                permission.map((item, index) => {
                  return (
                    <label className="d-block" key={index}>
                      <input
                        value={item.name}
                        checked={selected.includes(item.name)}
                        onChange={handleCheckboxChange}
                        type="checkbox"
                      />{" "}
                      <span> {item.name}</span>
                    </label>
                  );
                })}
            </div>
            <div className="my-3">
              <input type="submit" className="btn btn-primary btn-block" />
            </div>
          </form>
        </ModalPopup>

        <ModalPopup target="roleEdit" title="edit Role">
          <form action="" onSubmit={handleRoleEditSubmit}>
            <div className="my-3">
              <label htmlFor="">Role Name</label>
              <input
                type="text"
                name="name"
                value={edit.name}
                onChange={handleRoleEditChange}
                className="form-control"
              />
            </div>
            <div className="my-2">
              <label htmlFor="">Permission</label>
              {permission &&
                permission.map((item, index) => {
                  return (
                    <label className="d-block" key={index}>
                      <input
                        value={item.name}
                        checked={selected?.includes(item.name)}
                        onChange={handleCheckboxChange}
                        type="checkbox"
                      />{" "}
                      <span> {item.name}</span>
                    </label>
                  );
                })}
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-primary btn-block">
                Update
              </button>
            </div>
          </form>
        </ModalPopup>

        <PageHeader title="Roles" />
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              data-target="#userRolePopup"
              data-toggle="modal"
            >
              Add New Roles
            </button>{" "}
            <br /> <br />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  {role && (
                    <table className="mamutable table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: "50px" }}>1</th>
                          <th>Name</th>
                          <th>Slug</th>
                          <th>Permission</th>
                          <th>At a Time</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...role]?.reverse().map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.slug}</td>
                              <td>
                                <ul>
                                  {item.permissions.map((per, index) => {
                                    return <li key={index + 1}>{per}</li>;
                                  })}
                                </ul>
                              </td>
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
                                  data-target="#roleEdit"
                                  onClick={() => handleRoleEdit(item._id)}
                                >
                                  <BiEdit />
                                </button>{" "}
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

export default Roles;
