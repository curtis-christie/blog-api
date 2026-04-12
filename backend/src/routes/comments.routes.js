import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getPostComments,
} from "../controllers/comment.controller.js";
import createCommentSchema from "../schemas/comment.schema.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate } from "../middleware/validate.js";

const commentRouter = Router();

// get comment by id
commentRouter.get("/:commentId", getComment);
// get comments by postId
commentRouter.get("/post/:postId", getPostComments);
// create comment
commentRouter.post("/post/:postId", requireAuth, validate(createCommentSchema), createComment);
// delete comment
commentRouter.delete("/:commentId", requireAuth, deleteComment);

export default commentRouter;
