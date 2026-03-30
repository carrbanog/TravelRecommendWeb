import { apiClient } from "@/shared/api/apiClient";
import type { Comment, DeleteResponse } from "../model/type";

// 특정 게시물의 댓글을 가져오는 API 함수
export const fetchCommentsApi = async (postId: string): Promise<Comment[]> => {
  return await apiClient.get(`/comments/${postId}/comments`);
};
// 댓글 삭제 API 함수
export const deleteCommentApi = async (
  postId: string,
  commentId: string,
): Promise<DeleteResponse> => {
  return await apiClient.delete<DeleteResponse>(
    `/comments/${postId}/${commentId}`,
  );
};
