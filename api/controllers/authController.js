const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc get access User
 * @route post / register
 * @access PUBLIC
 */

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({
      message: "all fields are required",
    });
  }

  //email check
  const emailCheck = await User.findOne({ email }).populate("role");

  //email not found or wrong email
  if (!emailCheck) {
    res.status(404).json({
      message: "wrong email, user not found",
    });
  }

  //password Check
  const passCheck = await bcrypt.compare(password, emailCheck.password);

  //password not match
  if (!passCheck) {
    res.status(404).json({
      message: "wrong password",
    });
  }

  //create access token
  const token = jwt.sign(
    { email: emailCheck.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  //create refresh token
  const refToken = jwt.sign(
    {
      email: emailCheck.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    }
  );

  //save token to cookie memory
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    token,
    refToken,
    user: emailCheck,
    message: "user login successfully done",
  });
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(404).json({
      message: "all fields are required",
    });
  }

  //email check
  const emailCheck = await User.findOne({ email });

  //email not found or wrong email
  if (emailCheck) {
    return res.status(404).json({
      message: "email already exists",
    });
  }

  //password Check
  const hashpass = await bcrypt.hash(password, 10);

  //create new user
  const user = await User.create({
    name,
    email,
    password: hashpass,
  });
  return res.status(200).json({
    user,
    message: "user created successfully done",
  });
});

//logout user
const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({
    message: "logout successfully done",
  });
});

//logged in User
const loggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.me);
});

//update
const userUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const users = User.findByIdAndUpdate(
    id,
    { name, email },
    {
      new: true,
    }
  );
  res.json({ message: `user updated successfull`, users });
});

//export
module.exports = {
  userLogin,
  register,
  logout,
  loggedInUser,
  userUpdate,
};
