import { apiRequest } from "./client.js";

export function getAllPosts() {
  return apiRequest("/posts");
}
