import { createSlug } from "../helper/slug.js";
import Catagory from "../models/Catagory.js";
import asyncHandler from "express-async-handler";
import { cloudDelete, cloudUpload } from "../utils/coudinary.js";
import { findPublicId } from "../helper/helpers.js";

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
  const { name, parentCatagory, icon } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check existing Catagory
  const checkCatagory = await Catagory.findOne({ name });

  if (checkCatagory) {
    return res.status(404).json({ message: "Catagory already axistis" });
  }

  // for icon
  let catagoryIcon = null;
  if (icon) {
    catagoryIcon = icon;
  }

  //for catPhoto
  let catPhoto = null;
  if (req.file) {
    const cat = await cloudUpload(req);
    catPhoto = cat.secure_url;
  }

  // create new user data
  const catagory = await Catagory.create({
    name,
    slug: createSlug(name),
    parentCatagory: parentCatagory ? parentCatagory : null,
    icon: catagoryIcon,
    photo: catPhoto,
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
  const publicId = findPublicId(catagory.photo);
  await cloudDelete(publicId);

  // if (catagory.photo) {
  //   await cloudDelete(findPublicId(catagory.photo));
  // }

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

  const { name, parentCatagory, icon } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Catagory name is required" });
  }

  //cat update
  const catUpdate = await Catagory.findById(id);

  if (!catUpdate) {
    return res.status(400).json({ message: "Catagory not found" });
  }

  //for catagory icon
  let catIcon = catUpdate.icon;
  if (icon) {
    catIcon = icon;
  }

  //for Parentcatagory
  let parrentCat = catUpdate.parentCatagory;
  if (parentCatagory) {
    parrentCat = parentCatagory;
  }

  //for catagory photo
  let catfile = catUpdate.photo;

  if (req.file) {
    const catPhoto = await cloudUpload(req);
    catfile = catPhoto.secure_url;

    await cloudDelete(findPublicId(catUpdate.photo));
  }

  catUpdate.name = name;
  catUpdate.slug = createSlug(name);
  catUpdate.icon = catIcon;
  catUpdate.photo = catfile;
  catUpdate.parentCatagory = parrentCat;
  catUpdate.save();

  res.json({ message: `Catagory updated successful`, catagory: catUpdate });
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
