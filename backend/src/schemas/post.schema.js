import { z } from "zod";

const createPostSchema = z.object({
  // title, content, authorId
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters long")
      .max(255, "Title must be no more than 255 characters."),
    content: z.string().trim().nonempty("Must include the body content in article."),
  }),
});

const updatePostSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters long")
      .max(255, "Title must be no more than 255 characters.")
      .optional(),
    content: z.string().trim().nonempty("Must include the body content in article.").optional(),
    isPublished: z.boolean().optional(),
  }),
  params: z.object({
    postId: z.string().min(1, "Post id is required."),
  }),
});

export { createPostSchema, updatePostSchema };
