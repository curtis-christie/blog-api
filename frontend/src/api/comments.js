import { apiRequest } from "./client.js";

export function getCommentsByPost(postId) {
  return apiRequest(`/comments/post/${postId}`);
}

export function createComment(postId, commentData) {
  return apiRequest(`/comments/post/${postId}`, {
    method: "POST",
    body: JSON.stringify(commentData),
  });
}
