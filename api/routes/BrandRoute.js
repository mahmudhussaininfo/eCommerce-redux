import express from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";
import brandLogo from "../utils/multer.js";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  singleBrand,
  updateBrand,
} from "../controllers/brandController.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllBrand).post(brandLogo, createBrand);
router
  .route("/:id")
  .get(singleBrand)
  .put(brandLogo, updateBrand)
  .patch(brandLogo, updateBrand)
  .delete(deleteBrand);

//export
export default router;
