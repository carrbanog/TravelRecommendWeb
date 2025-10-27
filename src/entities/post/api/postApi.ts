
import api from '../../../shared/api/axiosInstance'
import type { CreatePostResponse, Post } from '../model/postTypes';


export const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
}

export const createPostApi = async (post:Post):Promise<CreatePostResponse> => {
  const response = await api.post<CreatePostResponse>('/createpost', post);
  return response.data;
}