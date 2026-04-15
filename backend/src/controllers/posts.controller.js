import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/appError.js";

// getAllPosts /api/posts/
async function getAllPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        content: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: { posts },
    });
  } catch (error) {
    next(error);
  }
}
// getPosts /api/posts/:postId
async function getPost(req, res, next) {
  try {
    const { postId } = req.params;
    const userId = req.user.sub;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new AppError("No post found", 404);
    }

    if (!isPublished && post.authorId !== userId) {
      throw new AppError("No post found", 404);
    }

    res.status(200).json({
      success: true,
      data: { post },
    });
  } catch (error) {
    next(error);
  }
}
// getOwnPosts /api/posts/own
async function getOwnPosts(req, res, next) {
  try {
    const userId = req.user.sub;

    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      select: {
        id: true,
        title: true,
        content: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      success: true,
      data: { posts },
    });
  } catch (error) {
    next(error);
  }
}
// createPost /api/posts/
async function createPost(req, res, next) {
  try {
    const { title, content, isPublished } = req.body;
    const authorId = req.user.sub;

    const existingPost = await prisma.post.findUnique({
      where: { title },
    });

    if (existingPost) {
      throw new AppError("Post with that title already exists", 409);
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        isPublished: isPublished ?? false,
        authorId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: { post: newPost },
    });
  } catch (error) {
    next(error);
  }
}
// updatePost /api/posts/:postId
async function updatePost(req, res, next) {
  try {
    const { postId } = req.params;
    const userId = req.user.sub; // from JWT
    const { title, content, isPublished } = req.body;

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

    if (title && title !== post.title) {
      const existingPost = await prisma.post.findUnique({
        where: { title },
      });

      if (existingPost) {
        throw new AppError("A post with that title already exists", 409);
      }
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(isPublished !== undefined && { isPublished }),
      },
    });

    res.status(200).json({
      success: true,
      data: { post: updatedPost },
    });
  } catch (error) {
    next(error);
  }
}
// deletePost /api/posts/:postId
async function deletePost(req, res, next) {
  try {
    const { postId } = req.params;
    const userId = req.user.sub;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if (post.authorId !== userId) {
      throw new AppError("Not authorized to delete", 403);
    }

    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });

    res.status(200).json({
      success: true,
      data: { post: deletedPost },
    });
  } catch (error) {
    next(error);
  }
}

export { getAllPosts, getPost, getOwnPosts, createPost, updatePost, deletePost };
