import express from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createCatagory,
  deleteCatagory,
  getAllCatagory,
  singleCatagory,
  updateCatagory,
} from "../controllers/catagoryController.js";
import { catagoryPhoto } from "../utils/multer.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllCatagory).post(catagoryPhoto, createCatagory);
router
  .route("/:id")
  .get(singleCatagory)
  .put(catagoryPhoto, updateCatagory)
  .patch(catagoryPhoto, updateCatagory)
  .delete(deleteCatagory);

//export
export default router;
