import {useQuery} from "@tanstack/react-query";
import type { Comment } from "./type";
import { fetchCommentsApi } from '../api/commentAPi';

// 특정 게시물의 댓글을 가져오는 API 함수

export const useComments = (postId: string) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsApi(postId),
    enabled: !!postId, // postId가 있을 때만 쿼리 실행
  });
}