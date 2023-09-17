import { createSlug } from "../helper/slug.js";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import { cloudDelete, cloudUpload, cloudUploads } from "../utils/coudinary.js";
import { findPublicId } from "../helper/helpers.js";

/**
 * @desc GET All Product
 * @route GET /Product
 * @access Private
 */
export const getAllProduct = asyncHandler(async (req, res) => {
  const product = await Product.find();
  if (product.length > 0) {
    return res.status(200).json(product);
  }

  return res.status(400).json({ message: "Products not found" });
});

/**
 * @desc create new Product
 * @route POST /Product
 * @access Private
 */
export const createProduct = asyncHandler(async (req, res) => {
  // get data
  const {
    name,
    productType,
    shortDesc,
    longDesc,
    productSimple,
    productVariable,
    productGroup,
    productExternal,
  } = req.body;
  // check validation
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check existing Product
  const checkProduct = await Product.findOne({ name });

  if (checkProduct) {
    return res.status(404).json({ message: "Product already axistis" });
  }

  //files uploads
  let productPhotos = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const file = await cloudUploads(req.files[i].path);
      productPhotos.push(file);
    }
  }

  //json to string
  const simpleProduct = JSON.parse(productSimple);

  // create new user data
  const product = await Product.create({
    name,
    slug: createSlug(name),
    productType,
    productSimple:
      productType === "Simple" ? { ...simpleProduct, productPhotos } : null,
    productVariable: productType === "Variable" ? productVariable : null,
    productGroup: productType === "Group" ? productGroup : null,
    productExternal: productType === "External" ? productExternal : null,
    shortDesc,
    longDesc,
  });

  // check
  if (product) {
    return res
      .status(201)
      .json({ message: "Product created successful", product });
  } else {
    return res.status(400).json({ message: "Invalid Product data" });
  }
});

/**
 * @desc single Product data
 * @route put/patch /Product/:id
 * @access PUBLIC
 */
export const singleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(400).json({ message: "Product id not found" });
  }
  res.status(200).json({ message: "single Product found", product });
});

/**
 * @desc delete Product data
 * @route DELETE /Product/:id
 * @access PRivate
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);
  const publicId = findPublicId(product.logo);
  await cloudDelete(publicId);

  if (!product) {
    return res.status(400).json({ message: "Product delete failed" });
  }
  res.status(200).json({ message: "Product delated successfully", product });
});

/**
 * @desc update Product data
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Product name is required" });
  }

  const ProductUpdate = await Product.findById(id);

  if (!ProductUpdate) {
    return res.status(404).json({ message: "Product logo not found" });
  }

  let updateLogo = ProductUpdate.logo;

  if (req.file) {
    const logo = await cloudUpload(req);
    updateLogo = logo.secure_url;
  }

  ProductUpdate.name = name;
  ProductUpdate.slug = createSlug(name);
  ProductUpdate.logo = updateLogo;
  ProductUpdate.save();
  res.json({ product: ProductUpdate, message: `Product updated successful` });
});

/**
 * @desc update status data
 * @route PATCH /status/:id
 * @access PUBLIC
 */
export const statusUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const product = await Product.findByIdAndUpdate(
    id,
    { status: !status },
    {
      new: true,
    }
  );
  res.status(200).json({ message: `status updated successfull`, product });
});
