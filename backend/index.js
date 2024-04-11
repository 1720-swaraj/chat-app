import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { dbConnection } from "./dbConnection/dbConnection.js";

dbConnection();
const app = express();
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listning to ${PORT}`));
