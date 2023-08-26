import { createSlug } from "../helper/slug.js";
import Catagory from "../models/Catagory.js";
import asyncHandler from "express-async-handler";

/**
 * @desc GET All Catagory
 * @route GET /Catagory
 * @access Private
 */
export const getAllCatagory = asyncHandler(async (req, res) => {
  const catagorys = await Catagory.find().populate([
    {
      path: "parentCatagory",
      populate: {
        path: "parentCatagory",
        populate: {
          path: "parentCatagory",
        },
      },
    },
    {
      path: "subCatagory",
      populate: {
        path: "subCatagory",
        populate: {
          path: "subCatagory",
        },
      },
    },
  ]);
  if (catagorys.length > 0) {
    return res.status(200).json(catagorys);
  }

  return res.status(400).json({ message: "Catagorys not found" });
});

/**
 * @desc create new Catagory
 * @route POST /Catagory
 * @access Private
 */
export const createCatagory = asyncHandler(async (req, res) => {
  // get data
  const { name, parentCatagory } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check existing Catagory
  const checkCatagory = await Catagory.findOne({ name });

  if (checkCatagory) {
    return res.status(404).json({ message: "Catagory already axistis" });
  }

  // create new user data
  const catagory = await Catagory.create({
    name,
    slug: createSlug(name),
    parentCatagory: parentCatagory ? parentCatagory : null,
  });

  if (parentCatagory) {
    const parent = await Catagory.findByIdAndUpdate(parentCatagory, {
      $push: { subCatagory: catagory._id },
    });
  }

  res.status(200).json({ message: "Catagory created successful", catagory });
});

/**
 * @desc single Catagory data
 * @route put/patch /Catagory/:id
 * @access PUBLIC
 */
export const singleCatagory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const catagory = await Catagory.findById(id);

  if (!catagory) {
    return res.status(400).json({ message: "Catagory id not found" });
  }
  res.status(200).json({ message: "single Catagory found", catagory });
});

/**
 * @desc delete Catagory data
 * @route DELETE /Catagory/:id
 * @access PRivate
 */
export const deleteCatagory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const catagory = await Catagory.findByIdAndDelete(id);

  if (!catagory) {
    return res.status(400).json({ message: "Catagory delete failed" });
  }
  res.status(200).json({ message: "Catagory delated successfully", catagory });
});

/**
 * @desc update Catagory data
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updateCatagory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Catagory name is required" });
  }

  const catagory = await Catagory.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name) },
    {
      new: true,
    }
  );
  res.json({ message: `Catagory updated successful`, catagory });
});

/**
 * @desc update status data
 * @route PATCH /status/:id
 * @access PUBLIC
 */
// const statusUpdate = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const { status } = req.body;

//   const catagory = await Catagory.findByIdAndUpdate(
//     id,
//     { status: !status },
//     {
//       new: true,
//     }
//   );
//   res.status(200).json({ message: `status updated successfull`, catagory});
// });
