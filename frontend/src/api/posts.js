import { apiRequest } from "./client.js";

export function getAllPosts() {
  return apiRequest("/posts");
}

export function getOwnPosts() {
  return apiRequest("/posts/own");
}

export function getPost(postId) {
  return apiRequest(`/posts/${postId}`);
}

export function createPost(postData) {
  return apiRequest("/posts", {
    method: "POST",
    body: JSON.stringify(postData),
  });
}

export function updatePost(postId, postData) {
  return apiRequest(`/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(postData),
  });
}

export function deletePost(postId) {
  return apiRequest(`/posts/${postId}`, {
    method: "DELETE",
  });
}
