// @ts-nocheck
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/appError.js";

// getAllPosts
async function getAllPosts(req, res, next) {
  return res.json({ message: "NOT IMPLEMENTED: getAllPosts" });
}
// getPosts
async function getPost(req, res, next) {
  return res.json({ message: "NOT IMPLEMENTED: getPost" });
}
// getOwnPosts
async function getOwnPosts(req, res, next) {
  return res.json({ message: "NOT IMPLEMENTED: getOwnPosts" });
}
// createPost
async function createPost(req, res, next) {
  try {
  } catch (error) {}
}
// updatePost
async function updatePost(req, res, next) {
  try {
    const { postId } = req.params;
    const userId = req.user.sub; // from JWT

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    // Ownership check
    if (post.authorId !== userId) {
      throw new AppError("Not authorized to update this post", 403);
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: req.body,
    });

    res.json({
      success: true,
      data: { post: updatedPost },
    });
  } catch (error) {
    next(error);
  }
}
// deletePost
async function deletePost(req, res, next) {
  return res.json({ message: "NOT IMPLEMENTED: deletePost" });
}

export { getAllPosts, getPost, getOwnPosts, createPost, updatePost, deletePost };
