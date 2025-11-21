import { apiClient } from "../../../shared/api/apiClient";
import api from "../../../shared/api/axiosInstance";
import type { CreatePostResponse, CreatePost, Post } from "../model/postTypes";

export const fetchPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const fetchPostById = async (id: string): Promise<Post> => {
  const response = await api.get(`posts/${id}`);
  // console.log(response)
  return response.data;
};

export const createPostApi = async (
  post: CreatePost
): Promise<CreatePostResponse> => {
  const response = await api.post<CreatePostResponse>("/createpost", post);
  console.log(response);
  return response.data;
};

export const createPost = async (
  post: CreatePost
): Promise<CreatePostResponse | undefined> => {
  if (!post) return;
  const res = await apiClient.post<CreatePost, CreatePostResponse>(
    "/createpost1",
    post
  );
  return res;
};
