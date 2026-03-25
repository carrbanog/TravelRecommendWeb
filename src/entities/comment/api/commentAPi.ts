import { apiClient } from '@/shared/api/apiClient';
import type { Comment } from '../model/type';

export const fetchCommentsApi = async (postId: string): Promise<Comment[]> => {
  return await apiClient.get(`/comments/${postId}/comments`);
}