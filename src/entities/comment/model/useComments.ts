import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import type { Comment } from "./type";
import { deleteCommentApi, fetchCommentsApi } from '../api/commentAPi';

// 특정 게시물의 댓글을 가져오는 API 함수

// 댓글 조회 훅
export const useComments = (postId: string) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsApi(postId),
    enabled: !!postId, // postId가 있을 때만 쿼리 실행
  });
}

export const useDeleteComment = (postId: string, commentId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteCommentApi(postId, commentId),
    onSuccess: (data) => {
      alert(data.message);
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error) => {
      console.error("댓글 삭제 오류:", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  });
}