const { createSlug } = require("../helper/slug");
const Brand = require("../models/Brand");
const asyncHandler = require("express-async-handler");

/**
 * @desc GET All Brand
 * @route GET /Brand
 * @access Private
 */
const getAllBrand = asyncHandler(async (req, res) => {
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
const createBrand = asyncHandler(async (req, res) => {
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
const singleBrand = asyncHandler(async (req, res) => {
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
const deleteBrand = asyncHandler(async (req, res) => {
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
const updateBrand = asyncHandler(async (req, res) => {
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
const statusUpdate = asyncHandler(async (req, res) => {
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

// export methods
module.exports = {
  getAllBrand,
  createBrand,
  singleBrand,
  deleteBrand,
  updateBrand,
};
