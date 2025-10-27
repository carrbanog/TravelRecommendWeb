import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPostApi } from '../api/postApi';
import type { CreatePostResponse, Post } from '../model/postTypes';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: Post) => createPostApi(newPost),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      //새 게시글이 추가되었으니, 기존에 캐시된 게시글 목록(["posts"])을 자동으로 다시 불러오게 함.
      console.log('Post created successfully:', data);
    },
    onError:(error) => {
      console.error('Error creating post:', error);
    },
    onSettled: () => {
      console.log("⚪ 요청 완료 (성공/실패 관계없이)");
    },
  })
}