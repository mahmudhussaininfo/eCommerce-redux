const { createSlug } = require("../helper/slug");
const Role = require("../models/Role");
const asyncHandler = require("express-async-handler");

// const bcrypt = require("bcrypt");

const getAllRole = asyncHandler(async (req, res) => {
  const roles = await Role.find();
  if (roles.length > 0) {
    res.status(200).json(roles);
  }
});

/**
 * @desc create new Role
 * @route POST /Role
 * @access Private
 */
const createRole = asyncHandler(async (req, res) => {
  // get data
  const { name, permissions } = req.body;

  // check validation
  if (!name || !permissions) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check existing Role
  const checkRole = await Role.findOne({ name });
  if (checkRole) {
    return res.status(404).json({ message: "Role already axistis" });
  }

  // create new user data
  const roles = await Role.create({
    name,
    slug: createSlug(name),
    permissions,
  });

  // check
  if (roles) {
    return res.status(201).json({ message: "Role created successful", roles });
  } else {
    return res.status(400).json({ message: "Invalid Role data" });
  }
});

/**
 * @desc single Role data
 * @route put/patch /Role/:id
 * @access PUBLIC
 */
const singleRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const roles = await Role.findById(id);

  if (!roles) {
    return res.status(400).json({ message: "Role id not found" });
  }
  res.status(200).json({ message: "single Role found", roles });
});

/**
 * @desc delete Role data
 * @route DELETE /Role/:id
 * @access PUBLIC
 */
const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const roles = await Role.findByIdAndDelete(id);

  if (!roles) {
    return res.status(400).json({ message: "Role delete failed" });
  }
  res.status(200).json({ message: "Role delated successfully", roles });
});

/**
 * @desc update Role data
 * @route PATCH /users/:id
 * @access PUBLIC
 */
const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;

  // validation
  if (!name || !permissions) {
    return res.status(400).json({ message: "Role is required" });
  }

  const roles = await Role.findByIdAndUpdate(
    id,
    { name, slug: createSlug(name), permissions },
    {
      new: true,
    }
  );
  res.json({ message: `Role updated successfull`, roles });
});

/**
 * @desc update status data
 * @route PATCH /status/:id
 * @access PUBLIC
 */
const statusRoleUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const roles = await Role.findByIdAndUpdate(
    id,
    { status: !status },
    {
      new: true,
    }
  );
  res.status(200).json({ message: `status updated successfull`, roles });
});

// export methods
module.exports = {
  getAllRole,
  createRole,
  singleRole,
  deleteRole,
  updateRole,
  statusRoleUpdate,
};
