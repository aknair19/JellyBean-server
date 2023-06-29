import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  userByBlogId
} from "../controller/blog.controller.js";

//router object
const router = express.Router();

router.get("/all-blog", getAllBlogs);
router.get("/get-blog/:id", getBlogById);

router.post("/create-blog", createBlog);

router.put("/update-blog/:id", updateBlog);

router.delete("/delete-blog/:id", deleteBlog);

//get blog by userid
router.get("/user-blog/:id", userByBlogId);

export default router;
