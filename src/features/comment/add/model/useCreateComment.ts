import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCommentApi } from '../api/commentApi';

// 댓글 생성 훅
export const useCreateComment = (postId: string, userEmail: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: { content: string }) =>
      createCommentApi(postId, {
        content: newComment.content,
        author: userEmail,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};