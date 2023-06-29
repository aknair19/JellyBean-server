import mongoose from "mongoose";
import blogModel from "../modals/blog.model.js";
import userModel from "../modals/user.modal.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).json({
        success: false,
        message: "no blogs found",
      });
    }
    return res.status(200).json({
      blogCount: blogs.length,
      success: true,
      message: "All blogs list",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while getting all blogs",
      error,
    });
  }
};
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "cannot find blog with this id" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blog found successfully", blog });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "csomething went wrong in getblogbyid",
      error,
    });
  }
};
export const createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res
        .status(200)
        .json({ success: false, message: "fill all required fields" });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "unable to find user" });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res
      .status(200)
      .json({ success: true, message: "blog uploaded successfully", newBlog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while creating new blog",
      error,
    });
  }
};
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Blog updated", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while updating  blog",
      error,
    });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel
      .findOneAndDelete(req.params.id)
      .populate("user");

    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while deleting  blog",
      error,
    });
  }
};

export const userByBlogId = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlog = await userModel.findById(id).populate("blogs");
    if (!userBlog) {
      return res.status(404).json({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "blogs found",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in user  blog",
      error,
    });
  }
};
