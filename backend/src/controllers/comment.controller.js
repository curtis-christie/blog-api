import { AppError } from "../utils/appError.js";
import { prisma } from "../lib/prisma.js";

// getComment /comments/:commentId
async function getComment(req, res, next) {
  try {
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
      },
    });

    if (!comment) {
      throw new AppError("No comment found", 404);
    }

    res.status(200).json({
      success: true,
      data: { comment },
    });
  } catch (error) {
    next(error);
  }
}
// getPostComments /comments/post/:postId
async function getPostComments(req, res, next) {
  const { postId } = req.params;

  const comments = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      comments: {
        select: {
          id: true,
          name: true,
          content: true,
          createdAt: true,
        },
      },
    },
  });

  if (!comments) {
    throw new AppError("Post has no comments", 404);
  }

  res.status(200).json({
    success: true,
    data: { comments },
  });
}
// createComment /comments/post/:postId
async function createComment(req, res, next) {
  try {
    const { content } = req.body;
    console.log(req.user);

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: req.user.sub,
        postId,
      },
      select: {
        id: true,
        content: true,
        authorId: true,
        postId: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      success: true,
      data: { comment },
    });
  } catch (error) {
    next(error);
  }
}
// deleteComment /comments/:commentId
async function deleteComment(req, res, next) {
  try {
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new AppError("No comment found", 404);
    }

    if (comment.authorId !== req.user.sub) {
      throw new AppError("Not authorized to delete comment", 403);
    }

    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({
      success: true,
      data: { deletedComment },
    });
  } catch (error) {
    next(error);
  }
}

export { getComment, getPostComments, createComment, deleteComment };
