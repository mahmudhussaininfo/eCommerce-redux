const express = require("express");
const {
  userLogin,
  register,
  logout,
  loggedInUser,
  userUpdate,
} = require("../controllers/authController");
const tokenVerify = require("../middlewares/tokenVerify");

//router
const router = express.Router();

//routing
router.route("/login").post(userLogin);
router.route("/register").post(register);
router.route("/logout").post(logout);
router.route("/me").get(tokenVerify, loggedInUser);
router.route("/:id").patch(userUpdate);

//export
module.exports = router;
