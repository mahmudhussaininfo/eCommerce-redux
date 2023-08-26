import express from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createTag,
  deleteTag,
  getAllTag,
  singleTag,
  updateTag,
} from "../controllers/tagController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllTag).post(createTag);
router
  .route("/:id")
  .get(singleTag)
  .put(updateTag)
  .patch(updateTag)
  .delete(deleteTag);

//export
export default router;
