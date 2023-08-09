const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { sendMail } = require("../utils/mail");

const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find().populate("role");
  if (user.length > 0) {
    return res.status(200).json(user);
  }
});

/**
 * @desc get Single users data
 * @route GET /users/:id
 * @access PUBLIC
 */
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password").lean();

  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }

  res.json(user);
});

/**
 * @desc create new user
 * @route POST /users
 * @access PUBLIC
 */
const createUser = asyncHandler(async (req, res) => {
  // get data
  const { name, email, password, role } = req.body;

  // check validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // email existance
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // create new user data
  const user = await User.create({ name, email, password: hash, role });

  //send mail
  sendMail({
    to: email,
    sub: "Account create",
    msg: `Hello ${name}, your account created done. here is your details. mail : ${email} and password : ${password}`,
  });

  // check
  if (user) {
    return res
      .status(201)
      .json({ message: `${name} User created successful`, user });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

/**
 * @desc delete user data
 * @route DELETE /users/:id
 * @access PUBLIC
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(400).json({ message: "User delete failed" });
  }

  res.json({ message: "user delated successful", user });
});

/**
 * @desc update user data
 * @route PATCH /users/:id
 * @access PUBLIC
 */
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, email, role } = req.body;

  const findUser = await User.findById(id);
  if (!findUser) {
    return res.status(404).json({ message: "user not found" });
  }
  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      role,
    },
    {
      new: true,
    }
  );

  res.json({ message: `${name} User updated successfull`, user });
});

//from shajib
// const updateUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const { name, email } = req.body;

//   const findUser = await User.findById(id);
//   if (!findUser) {
//     return res.status(404).json({ message: "user not found" });
//   }
//   const user = await User.findByIdAndUpdate(
//     id,
//     {
//       name: req.body?.name ? req.body?.name : findUser.name,
//       email: req.body?.email ? req.body?.email : findUser.email,
//     },
//     {
//       new: true,
//     }
//   );

//   res.json({ message: `User updated successfull`, user });
// });

/**
 * @desc update status data
 * @route PATCH /status/:id
 * @access PUBLIC
 */
const statusUserUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { status: !status },
    {
      new: true,
    }
  );
  res.status(200).json({ message: `status updated successful`, user });
});

/**
 * @DESC Change password
 * @ROUTE /api/v1/password/:id
 * @method POST
 * @access public
 */
const changePass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { oldPass, newPass } = req.body;

  if (!oldPass || !newPass)
    return res.status(400).json({ message: "All fields are required!" });

  const getUser = await User.findById(id);

  if (!getUser) return res.status(404).json({ message: "Use not found!" });

  const passCheck = await bcrypt.compare(oldPass, getUser.password);

  if (!passCheck)
    return res.status(400).json({ message: "Password not match!" });

  const hashPass = await bcrypt.hash(newPass, 10);
  const changeData = await User.findByIdAndUpdate(
    id,
    { password: hashPass },
    { new: true }
  );

  res
    .status(200)
    .json({ data: changeData, message: "Password change successful.." });
});

// export methods
module.exports = {
  getAllUser,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
  changePass,
  statusUserUpdate,
};
