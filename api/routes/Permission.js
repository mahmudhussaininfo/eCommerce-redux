import express from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createPermission,
  deletePermission,
  getAllPermission,
  singlePermission,
  statusUpdate,
  updatePermission,
} from "../controllers/permissionController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllPermission).post(createPermission);
router
  .route("/:id")
  .get(singlePermission)
  .delete(deletePermission)
  .put(updatePermission)
  .patch(updatePermission);

router.patch("/status/:id", statusUpdate);

//export
export default router;
