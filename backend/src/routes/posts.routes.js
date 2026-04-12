import { Router } from "express";
import {
  getAllPosts,
  getPost,
  getOwnPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controller.js";
import { validate } from "../middleware/validate.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";
import { requireAuth } from "../middleware/requireAuth.js";

const postsRouter = Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/own/", requireAuth, getOwnPosts);
postsRouter.get("/:postId", getPost);

postsRouter.post("/", requireAuth, validate(createPostSchema), createPost);
postsRouter.put("/:postId", requireAuth, validate(updatePostSchema), updatePost);
postsRouter.delete("/:postId", requireAuth, deletePost);

export default postsRouter;
