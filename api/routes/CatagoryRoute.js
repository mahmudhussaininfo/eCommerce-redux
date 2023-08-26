import express from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createCatagory,
  deleteCatagory,
  getAllCatagory,
  singleCatagory,
  updateCatagory,
} from "../controllers/catagoryController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllCatagory).post(createCatagory);
router
  .route("/:id")
  .get(singleCatagory)
  .put(updateCatagory)
  .patch(updateCatagory)
  .delete(deleteCatagory);

//export
export default router;
