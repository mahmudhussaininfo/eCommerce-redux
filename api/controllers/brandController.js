import { createSlug } from "../helper/slug.js";
import Brand from "../models/Brand.js";
import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: "dcli0sqrt",
  api_key: "889969636973233",
  api_secret: "-t-XcAw5uuAyCdq7O8TlYm1ApEM",
});

/**
 * @desc GET All Brand
 * @route GET /Brand
 * @access Private
 */
export const getAllBrand = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  if (brands.length > 0) {
    return res.status(200).json(brands);
  }

  return res.status(400).json({ message: "brands not found" });
});

/**
 * @desc create new Brand
 * @route POST /Brand
 * @access Private
 */
export const createBrand = asyncHandler(async (req, res) => {
  // get data
  const { name } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check existing Brand
  const checkBrand = await Brand.findOne({ name });

  if (checkBrand) {
    return res.status(404).json({ message: "Brand already axistis" });
  }

  //upload logo to cloudinary
  fs.writeFileSync("/" + req.file.originalname, req.file.buffer);
  const logo = await cloudinary.v2.uploader.upload(
    "/" + req.file.originalname,
    req.file.buffer
  );
  fs.unlinkSync("/" + req.file.originalname);
  console.log(logo);

  // create new user data
  const brand = await Brand.create({
    name,
    slug: createSlug(name),
  });

  // check
  if (brand) {
    return res.status(201).json({ message: "Brand created successful", brand });
  } else {
    return res.status(400).json({ message: "Invalid Brand data" });
  }
});

/**
 * @desc single Brand data
 * @route put/patch /Brand/:id
 * @access PUBLIC
 */
export const singleBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(400).json({ message: "Brand id not found" });
  }
  res.status(200).json({ message: "single Brand found", brand });
});

/**
 * @desc delete Brand data
 * @route DELETE /Brand/:id
 * @access PRivate
 */
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return res.status(400).json({ message: "Brand delete failed" });
  }
  res.status(200).json({ message: "Brand delated successfully", brand });
});

/**
 * @desc update Brand data
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Brand name is required" });
  }

  const brand = await Brand.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name) },
    {
      new: true,
    }
  );
  res.json({ message: `Brand updated successful`, brand });
});

/**
 * @desc update status data
 * @route PATCH /status/:id
 * @access PUBLIC
 */
export const statusUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const Brand = await Brand.findByIdAndUpdate(
    id,
    { status: !status },
    {
      new: true,
    }
  );
  res.status(200).json({ message: `status updated successfull`, Brand });
});
