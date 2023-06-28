import { response } from "express";
import UserSchema from "../modals/user.modal.js";
export const signupUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new UserSchema(user);
    await newUser.save();
    return response.status(200).json({ msg: "signup successfull" });
  } catch (error) {
    return response.status(500).json({ msg: "error while signup user " });
  }
};
