import mongoose from "mongoose";

export const dbConnection = async (req, res) => {
  return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
