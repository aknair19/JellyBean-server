import userModel from "../modals/user.modal.js";
import UserModel from "../modals/user.modal.js";
import bcrypt from "bcrypt";
//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      userCount: users.length,
      success: true,
      message: "all user data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in get all users", error });
  }
};

//create new user

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all require fields",
      });
    }
    //existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "user already exists with given email",
      });
    }
    //save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();
    return res
      .status(201)
      .json({ success: true, message: "Registered successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

//login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Fill the required fields", success: false });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "user not found with given email id",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "invalid username or password",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      message: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error in login callback",
      success: false,
      error,
    });
  }
};
