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

// 인기글 불러오는 api (나중에 인기글 기준이 생기면 수정 필요)
export const fetchPopularPosts = async (): Promise<Post[]> => {
  const res = await apiClient.get<Post[]>(`/posts?limit=4`);
  return res;
}