import express from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";
import {
  changePass,
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  statusUserUpdate,
  updateUser,
} from "../controllers/userController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getSingleUser).delete(deleteUser).patch(updateUser);
router.route("/password/:id").post(changePass);

router.patch("/status/:id", statusUserUpdate);

//export
export default router;
