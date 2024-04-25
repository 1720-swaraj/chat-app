import { register } from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.route("/register").post(register);
export default router;
