import express from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";
import {
  loggedInUser,
  logout,
  register,
  userLogin,
  userUpdate,
} from "../controllers/authController.js";

//router
const router = express.Router();

//routing
router.route("/login").post(userLogin);
router.route("/register").post(register);
router.route("/logout").post(logout);
router.route("/me").get(tokenVerify, loggedInUser);
router.route("/:id").patch(userUpdate);

//export
export default router;
