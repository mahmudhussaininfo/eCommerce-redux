import { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "datatables.net-dt";
import PageHeader from "../PageHeader/PageHeader";
import ModalPopup from "../ModalPopup/ModalPopup";
import {
  getAllPrmissionData,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  createPermission,
  deletePermission,
  permissionUpdate,
  statusPermissionUpdate,
} from "../../features/user/userApiSlice";
import { createToast } from "../../utils/toast";
import swal from "sweetalert";
import { timeAgo } from "../../helper/helper";

const Permission = () => {
  const dispatch = useDispatch();
  const { permission, error, message } = useSelector(getAllPrmissionData);

  const [input, setInput] = useState({
    name: "",
  });

  const [edit, setEdit] = useState("");

  //handle input change
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handle Submit data
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPermission(input));
    setInput({ name: "" });
  };

  //handle delate
  const handleDelate = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePermission(id));
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //status update
  const handleStautsUpdate = (status, id) => {
    dispatch(statusPermissionUpdate({ status, id }));
  };
  useEffect(() => {
    new DataTable(".mamutable");
  });

  // handle permission update
  const handleEditPermission = (id) => {
    const findPermission = permission.find((data) => data._id === id);
    setEdit(findPermission);
  };

  //handle permission Change
  const handlePermissionChange = (e) => {
    setEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handle permission submit
  const handlePermissionSubmit = (e) => {
    e.preventDefault();
    dispatch(
      permissionUpdate({
        id: edit._id,
        name: edit.name,
      })
    );
    setEdit({ name: "" });
  };

  useEffect(() => {
    if (error && permission) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message && permission) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, permission]);

  return (
    <>
      <div className="page-header">
        <ModalPopup target="userPermissionPopup" title="permission">
          <form action="" onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="">Permission Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="my-3">
              <input type="submit" className="btn btn-primary btn-block" />
            </div>
          </form>
        </ModalPopup>

        <ModalPopup target="permissionEdit" title="permission">
          <form action="" onSubmit={handlePermissionSubmit}>
            <div className="my-3">
              <label htmlFor="">Permission Name</label>
              <input
                type="text"
                name="name"
                value={edit.name}
                onChange={handlePermissionChange}
                className="form-control"
              />
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-primary btn-block">
                Update
              </button>
            </div>
          </form>
        </ModalPopup>
        <PageHeader title="Permission" />
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              data-target="#userPermissionPopup"
              data-toggle="modal"
            >
              Add New Permission
            </button>
            <br /> <br />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  {permission && (
                    <table className="mamutable table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>1</th>
                          <th>Name</th>
                          <th>Slug</th>
                          <th>At a Time</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...permission].reverse().map((item, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ width: "50px" }}>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.slug}</td>
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
                                  data-target="#permissionEdit"
                                  onClick={() => handleEditPermission(item._id)}
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

export default Permission;
