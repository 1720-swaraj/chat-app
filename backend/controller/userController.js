import { User } from "../models/usersModel.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password not match" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res
        .status(400)
        .json({ message: "user allready exist try different" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    //profile photo

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;

    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;
    await User.create({
      fullName,
      userName,
      password: hashPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    return res.status(201).json({ message: "account created" });
  } catch (error) {
    console.log(error);
  }
};
