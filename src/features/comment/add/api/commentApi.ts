import { apiClient } from "../../../../shared/api/apiClient";
import type { CommentResponse, CreateCommentRequest } from "../model/type";

// 댓글 생성 API
export const createCommentApi = async (postId: string, data: CreateCommentRequest) => {
  return await apiClient.post<CreateCommentRequest, CommentResponse>(
    `/comments/${postId}`, 
    data
  );
};