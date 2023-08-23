const express = require("express");
const tokenVerify = require("../middlewares/tokenVerify");
const {
  getAllTag,
  createTag,
  singleTag,
  updateTag,
  deleteTag,
} = require("../controllers/tagController");

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
module.exports = router;
