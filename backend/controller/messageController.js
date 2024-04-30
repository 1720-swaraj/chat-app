import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receverId = req.params.id;
    const { message } = req.body;
    if (!receverId) {
      return res.status(400).json({ error: "ReceiverId is required" });
    }
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receverId] },
    });
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receverId],
      });
    }
    if (senderId && receverId && message) {
      const newMessage = await Message.create({
        senderId,
        receverId,
        message,
      });

      if (newMessage) {
        gotConversation.messages.push(newMessage._id);
        await gotConversation.save();
        return res.status(201).json({ message: "message send succeesfully" });
      } else {
        return res
          .status(400)
          .json({ error: "SenderId, ReceiverId, and Message are required" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
