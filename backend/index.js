import express, { json } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { dbConnection } from "./dbConnection/dbConnection.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
dbConnection();
const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cookieParser())
//routes
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => console.log(`listning to ${PORT}`));
