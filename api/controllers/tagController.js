import { createSlug } from "../helper/slug.js";
import Tag from "../models/Tag.js";
import asyncHandler from "express-async-handler";

/**
 * @desc GET All Tag
 * @route GET /Tag
 * @access Private
 */
export const getAllTag = asyncHandler(async (req, res) => {
  const tags = await Tag.find();
  if (tags.length > 0) {
    return res.status(200).json(tags);
  }

  return res.status(400).json({ message: "Tags not found" });
});

/**
 * @desc create new Tag
 * @route POST /Tag
 * @access Private
 */
export const createTag = asyncHandler(async (req, res) => {
  // get data
  const { name } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check existing Tag
  const checkTag = await Tag.findOne({ name });

  if (checkTag) {
    return res.status(404).json({ message: "Tag already axistis" });
  }

  // create new user data
  const tag = await Tag.create({
    name,
    slug: createSlug(name),
  });

  // check
  if (tag) {
    return res.status(201).json({ message: "Tag created successful", tag });
  } else {
    return res.status(400).json({ message: "Invalid Tag data" });
  }
});

/**
 * @desc single Tag data
 * @route put/patch /Tag/:id
 * @access PUBLIC
 */
export const singleTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findById(id);

  if (!tag) {
    return res.status(400).json({ message: "Tag id not found" });
  }
  res.status(200).json({ message: "single Tag found", tag });
});

/**
 * @desc delete Tag data
 * @route DELETE /Tag/:id
 * @access PRivate
 */
export const deleteTag = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tag = await Tag.findByIdAndDelete(id);

  if (!tag) {
    return res.status(400).json({ message: "Tag delete failed" });
  }
  res.status(200).json({ message: "Tag delated successfully", tag });
});

/**
 * @desc update Tag data
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updateTag = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Tag name is required" });
  }

  const tag = await Tag.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name) },
    {
      new: true,
    }
  );
  res.json({ message: `Tag updated successful`, tag });
});

/**
 * @desc update status data
 * @route PATCH /status/:id
 * @access PUBLIC
 */
// const statusUpdate = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const { status } = req.body;

//   const tag = await Tag.findByIdAndUpdate(
//     id,
//     { status: !status },
//     {
//       new: true,
//     }
//   );
//   res.status(200).json({ message: `status updated successfull`, tag });
// });
