import { apiClient } from "../../../shared/api/apiClient";
import type { Post } from "../model/postTypes";

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await apiClient.get<Post[]>("/posts");
  return res;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const res = await apiClient.get<Post>(`posts/${id}`);
  return res;
};

export const deletePost = async (id: string) => {
  const res = await apiClient.delete<void>(`/posts/${id}`);
  return res;
}