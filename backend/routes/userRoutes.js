import {
  register,
  login,
  logout,
  getOtherUsers,
} from "../controller/userController.js";
import express from "express";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated,getOtherUsers);
export default router;
