import { User } from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//-------------Register-----------------------
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
    return res.status(201).json({ message: "account created successfully" });
  } catch (error) {
    console.log(error);
  }
};
//-----------------------LOGIN--------------------
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "user not found plese register user",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "user not found plese register user",
        success: false,
      });
    }
    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

//--------------LOGOUT-------------------------------------

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "log out successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const outherUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res.status(200).json(outherUsers);
  } catch (error) {
    console.log(error);
  }
};
