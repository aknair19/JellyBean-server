import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
  
    username: {
      type: String,
      required: true,
      unique: [true, "username is required"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
