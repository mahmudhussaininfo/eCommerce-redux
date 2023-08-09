const express = require("express");
const tokenVerify = require("../middlewares/tokenVerify");
const {
  getAllRole,
  createRole,
  singleRole,
  deleteRole,
  updateRole,
  statusRoleUpdate,
} = require("../controllers/roleController");

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
module.exports = router;
