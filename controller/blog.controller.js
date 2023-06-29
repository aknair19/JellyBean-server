import blogModel from "../modals/blog.model.js";

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
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      return res
        .status(200)
        .json({ success: false, message: "fill all required fields" });
    }
    const newBlog = new blogModel({ title, description, image });
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
    const { id } = req.params;
    await blogModel.findByIdAndDelete(id);
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
