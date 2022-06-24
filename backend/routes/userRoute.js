const express = require("express");
const {
  registerUser,
  logout,
  getUserDetails,
  updateProfile,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/logout").get(isAuthenticatedUser, logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
