const express = require("express");
const {
  getAllUser,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
  changePass,
  statusUserUpdate,
} = require("../controllers/userController");
const tokenVerify = require("../middlewares/tokenVerify");

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getSingleUser).delete(deleteUser).patch(updateUser);
router.route("/password/:id").post(changePass);

router.patch("/status/:id", statusUserUpdate);

//export
module.exports = router;
