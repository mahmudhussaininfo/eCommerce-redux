import express from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createRole,
  deleteRole,
  getAllRole,
  singleRole,
  statusRoleUpdate,
  updateRole,
} from "../controllers/roleController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllRole).post(createRole);
router
  .route("/:id")
  .get(singleRole)
  .delete(deleteRole)
  .put(updateRole)
  .patch(updateRole);

router.patch("/status/:id", statusRoleUpdate);

//export
export default router;
