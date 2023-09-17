import express from "express";
import { tokenVerify } from "../middlewares/tokenVerify.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { productPhoto } from "../utils/multer.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllProduct).post(productPhoto, createProduct);
router
  .route("/:id")
  .get(singleProduct)
  .put(updateProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

//export
export default router;
