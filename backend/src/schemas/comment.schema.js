import { z } from "zod";

const createCommentSchema = z.object({
  body: z.object({
    content: z.string().trim().min(1, "You must enter a comment."),
    postId: z.string().min(1, "postId missing from createComment."),
  }),
});

export default createCommentSchema;
