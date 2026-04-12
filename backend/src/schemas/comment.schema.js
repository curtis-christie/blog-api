import { z } from "zod";

const createCommentSchema = z.object({
  body: z.object({
    content: z.string().trim().min(1, "You must enter a comment."),
  }),
  params: z.object({
    postId: z.string(),
  }),
});

export default createCommentSchema;
