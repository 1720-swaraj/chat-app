import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId, //taking user id from "User"schema
      ref: "User", //taking user id from "User"schema
      required: true,
    },
    receverId: {
      type: mongoose.Schema.Types.ObjectId, //taking user id from "User"schema
      ref: "User", //taking user id from "User"schema
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageModel);
