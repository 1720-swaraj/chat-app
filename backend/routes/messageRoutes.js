import express from "express";
import { sendMessage } from "../controller/messageController.js";
import { isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage);

export default router;
    