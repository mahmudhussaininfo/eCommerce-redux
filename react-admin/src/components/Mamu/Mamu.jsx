import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFormFields from "../../hooks/useFormFields";
import { getAllPrmissionData } from "../../features/user/userSlice";

const Mamu = () => {
  const dispatch = useDispatch();
  const { roles, permission, error, message } =
    useSelector(getAllPrmissionData);
  const { input, handleChange } = useFormFields({
    name: "",
  });
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <input type="text" name="name" value={input.name} />
          <button type="submit">Submit</button>
        </div>
        <div className="col-md-9">
          {permission && (
            <table className="mamutable table table-hover table-center mb-0">
              <thead>
                <th>#</th>
                <th>name</th>
                <th>slug</th>
                <th>permission</th>
              </thead>
              <tbody>
                {[...permission].map((item, index) => {
                  return (
                    <tr>
                      <td>1</td>
                      <td>{item.name}</td>
                      <td>slug</td>
                      <td>permission</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Mamu;
