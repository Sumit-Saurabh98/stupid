import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { setCookie } from "../utils/setCookie.js";
import { validateInput } from "../utils/validateInput.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    validateInput(req, res, username, email, password);

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res
        .status(401)
        .json({ message: "User already exists", status: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const { accessToken } = generateToken({
      _id: newUser._id.toString(),
      username: newUser.username,
    });

    setCookie(res, accessToken);

    res
      .status(200)
      .json({
        message: "Account created successfully",
        data: newUser,
        status: true,
      });
  } catch (error) {
    console.log(`error in sign up controllers: ${error}`);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    validateInput(req, res, "username", email, password);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found", status: false });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password!);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", status: false });
    }

    const { accessToken } = generateToken({
      _id: user._id.toString(),
      username: user.username,
    });

    setCookie(res, accessToken);

    res
      .status(200)
      .json({ message: "Logged in successfully", data: user, status: true });
  } catch (error: any) {
    console.log(`error in log in controllers: ${error}`);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies._jsonwebtoken_stupid_token;

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized", status: false });
    }

    res.clearCookie("_jsonwebtoken_stupid_token");

    res.status(200).json({ message: "Logged out successful" });
  } catch (error) {
    console.log(`error in log out controllers: ${error}`);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

export const getProfile = (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.status(200).json({ data: user });
  } catch (error) {
    console.log("Error in getting profile:", error);
    res.status(500).json({ message: "Internal server error: " + error });
  }
};
