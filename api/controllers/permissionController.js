import { createSlug } from "../helper/slug.js";
import Permission from "../models/Permission.js";
import asyncHandler from "express-async-handler";

// const bcrypt = require("bcrypt");

/**
 * @desc GET All permission
 * @route GET /permission
 * @access Private
 */
export const getAllPermission = asyncHandler(async (req, res) => {
  const permission = await Permission.find();

  if (permission.length > 0) {
    res.status(200).json(permission);
  }
});

/**
 * @desc create new permission
 * @route POST /permission
 * @access Private
 */
export const createPermission = asyncHandler(async (req, res) => {
  // get data
  const { name } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check existing permission
  const checkPermission = await Permission.findOne({ name });

  if (checkPermission) {
    return res.status(404).json({ message: "permission already axistis" });
  }

  // create new user data
  const permission = await Permission.create({
    name,
    slug: createSlug(name),
  });

  // check
  if (permission) {
    return res
      .status(201)
      .json({ message: "permission created successful", permission });
  } else {
    return res.status(400).json({ message: "Invalid permission data" });
  }
});

/**
 * @desc single Permission data
 * @route put/patch /permission/:id
 * @access PUBLIC
 */
export const singlePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permissionData = await Permission.findById(id);

  if (!permissionData) {
    return res.status(400).json({ message: "Permission id not found" });
  }
  res.status(200).json({ message: "single permission found", permissionData });
});

/**
 * @desc delete permission data
 * @route DELETE /permission/:id
 * @access PRivate
 */
export const deletePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findByIdAndDelete(id);

  if (!permission) {
    return res.status(400).json({ message: "Permission delete failed" });
  }
  res
    .status(200)
    .json({ message: "permission delated successfully", permission });
});

/**
 * @desc update permission data
 * @route PATCH /users/:id
 * @access PUBLIC
 */
export const updatePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "permission name is required" });
  }

  const permission = await Permission.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name) },
    {
      new: true,
    }
  );
  res.json({ message: `permission updated successfull`, permission });
});

/**
 * @desc update status data
 * @route PATCH /status/:id
 * @access PUBLIC
 */
export const statusUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const permission = await Permission.findByIdAndUpdate(
    id,
    { status: !status },
    {
      new: true,
    }
  );
  res.status(200).json({ message: `status updated successfull`, permission });
});
