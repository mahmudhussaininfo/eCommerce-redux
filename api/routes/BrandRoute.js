const express = require("express");
const tokenVerify = require("../middlewares/tokenVerify");
const {
  getAllBrand,
  createBrand,
  singleBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllBrand).post(createBrand);
router
  .route("/:id")
  .get(singleBrand)
  .put(updateBrand)
  .patch(updateBrand)
  .delete(deleteBrand);

//export
module.exports = router;
