import axios from 'axios'
import api from '../../../shared/api/axiosInstance'
import type { Post } from '../model/postTypes';


export const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
}

export const createPost = async (post:Post) => {
  const response = await api.post('/createpost', post);
  return response.data;
}