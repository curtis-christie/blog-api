import { z } from "zod";

const createCommentSchema = z.object({
  body: z.object({
    content: z.string().trim().min(1, "You must enter a comment."),
    postId: z.string().min(1, "postId missing from createComment."),
  }),
  params: z.object({
    postId: z.string().min(1, "Post id is required."),
  }),
});

export default createCommentSchema;
