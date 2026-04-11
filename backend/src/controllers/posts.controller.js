import { prisma } from "../lib/prisma.js";

// getAllPosts
async function getAllPosts(req, res, next) {
  try {
  } catch (error) {}
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
  return res.json({ message: "NOT IMPLEMENTED: createPost" });
}
// updatePost
async function updatePost(req, res, next) {
  return res.json({ message: "NOT IMPLEMENTED: updatePost" });
}
// deletePost
async function deletePost(req, res, next) {
  return res.json({ message: "NOT IMPLEMENTED: deletePost" });
}

export { getAllPosts, getPost, getOwnPosts, createPost, updatePost, deletePost };
