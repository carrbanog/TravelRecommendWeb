import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import type { Comment } from "./type";
import { deleteCommentApi, fetchCommentsApi } from '../api/commentAPi';
import { toast } from "sonner";


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
    mutationFn: () => deleteCommentApi("postId", commentId), // 실제 commentId를 전달해야 함
    onSuccess: (data) => {
      toast.success(data.message || "댓글이 성공적으로 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      // comments와 postID가 일치하는 쿼리를 무효화하여 댓글 목록을 최신 상태로 갱신
    },
    onError: (error: any) => {
      toast.error("댓글 삭제 중 오류가 발생했습니다.", {
        description: error.customMessage || "잠시 후 다시 시도해보세요.",
      });
    }
  });
}