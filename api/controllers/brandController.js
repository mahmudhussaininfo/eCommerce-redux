import { createSlug } from "../helper/slug.js";
import Brand from "../models/Brand.js";
import asyncHandler from "express-async-handler";
import { cloudDelete, cloudUpload } from "../utils/coudinary.js";
import { findPublicId } from "../helper/helpers.js";

/**
 * @desc GET All Brand
 * @route GET /Brand
 * @access Private
 */
export const getAllBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.find();
  if (brand.length > 0) {
    return res.status(200).json(brand);
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

  //upload photo to cloude
  let logoData = null;
  if (req.file) {
    const file = await cloudUpload(req);
    logoData = file.secure_url;
  }

  // create new user data
  const brand = await Brand.create({
    name,
    slug: createSlug(name),
    logo: logoData,
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
  const publicId = findPublicId(brand.logo);
  await cloudDelete(publicId);

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

  const brandUpdate = await Brand.findById(id);

  if (!brandUpdate) {
    return res.status(404).json({ message: "Brand logo not found" });
  }

  let updateLogo = brandUpdate.logo;

  if (req.file) {
    const logo = await cloudUpload(req);
    updateLogo = logo.secure_url;
  }

  brandUpdate.name = name;
  brandUpdate.slug = createSlug(name);
  brandUpdate.logo = updateLogo;
  brandUpdate.save();
  res.json({ brand: brandUpdate, message: `Brand updated successful` });
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
