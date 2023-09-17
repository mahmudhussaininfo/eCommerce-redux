import React, { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import useFormFields from "../../hooks/useFormFields";
import {
  getAllProduct,
  setMessageEmpty,
} from "../../features/product/productSlice";
import { createBrand } from "../../features/product/productApiSlice";
import { createToast } from "../../utils/toast";

const Brand = () => {
  const dispatch = useDispatch();
  const { input, handleChange, resetForm } = useFormFields({
    name: "",
  });

  const { brand, category, loader, error, message } =
    useSelector(getAllProduct);

  console.log(brand);

  const [prev, setPrev] = useState(null);
  const [logo, setLogo] = useState(null);

  //handle Preview Change
  const handlePrevChange = (e) => {
    setLogo(e.target.files[0]);
    setPrev(URL.createObjectURL(e.target.files[0]));
  };

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form_Data = new FormData();
    form_Data.append("name", input.name);
    form_Data.append("logo", logo);
    dispatch(createBrand(form_Data));
    resetForm();
  };

  useEffect(() => {
    if (error && brand) {
      createToast(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message && brand) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, brand]);

  return (
    <>
      <div className="page-header">
        <ModalPopup target="brandPopup" title="brand">
          <form action="" onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="">Brand Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <img className="w-100" src={prev} alt="" />
            </div>
            <div className="my-2">
              <input type="file" onChange={handlePrevChange} />
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-primary w-100">
                {loader ? "loading..." : "submit"}
              </button>
            </div>
          </form>
        </ModalPopup>

        <PageHeader title="Brand" />
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              data-target="#brandPopup"
              data-toggle="modal"
            >
              Add New Brand
            </button>{" "}
            <br /> <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;
