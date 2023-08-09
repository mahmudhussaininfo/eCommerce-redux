const express = require("express");
const tokenVerify = require("../middlewares/tokenVerify");
const {
  getAllPermission,
  createPermission,
  deletePermission,
  singlePermission,
  updatePermission,
  statusUpdate,
} = require("../controllers/permissionController");

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
module.exports = router;
