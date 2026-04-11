import { Router } from "express";
import {
  getAllPosts,
  getPost,
  getOwnPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controller.js";

const postsRouter = Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/:postId", getPost);
postsRouter.get("/own/:authorId", getOwnPosts);
postsRouter.post("/", createPost);
postsRouter.put("/:postId", updatePost);
postsRouter.delete("/:postId", deletePost);

export default postsRouter;
