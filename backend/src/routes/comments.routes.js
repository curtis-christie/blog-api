import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getPostComments,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

// get comment by id
commentRouter.get("/:commentId", getComment);
// get comments by postId
commentRouter.get("/post/:postId", getPostComments);
// create comment
commentRouter.post("/", createComment);
// delete comment
commentRouter.delete("/:commentId", deleteComment);

export default commentRouter;
