import { apiClient } from "../../../shared/api/apiClient";
import api from "../../../shared/api/axiosInstance";
import type { CreatePostResponse, CreatePost, Post } from "../model/postTypes";

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await apiClient.get<Post[]>("/posts");
  return res;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const res = await apiClient.get<Post>(`posts/${id}`);
  return res;
};

export const createPost = async (
  post: CreatePost
): Promise<CreatePostResponse | undefined> => {
  if (!post) return;
  const res = await apiClient.post<CreatePost, CreatePostResponse>(
    "/createpost",
    post
  );
  return res;
};
