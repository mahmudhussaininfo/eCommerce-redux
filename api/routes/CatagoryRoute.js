const express = require("express");
const tokenVerify = require("../middlewares/tokenVerify");
const {
  getAllCatagory,
  createCatagory,
  singleCatagory,
  updateCatagory,
  deleteCatagory,
} = require("../controllers/catagoryController");

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
module.exports = router;
