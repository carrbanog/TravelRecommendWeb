import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createPostApi } from "../api/postApi";
import type { CreatePost } from "./type";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    // 1. API 호출 함수 연결
    mutationFn: (newPost: CreatePost) => createPostApi(newPost),

    // 2. 성공 시 로직 (캐시 무효화 + 알림 + 이동)
    onSuccess: (data) => {
      // "posts" 키를 가진 모든 쿼리를 무효화하여 목록을 새로고침함
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      
      toast.success("게시글이 성공적으로 작성되었습니다!");
      console.log("Post created successfully:", data);
      
      // 작성 완료 후 커뮤니티 목록으로 이동
      navigate("/community");
    },

    // 3. 에러 처리
    onError: (error: any) => {
      toast.error("게시글 작성에 실패했습니다. 다시 시도해주세요.");
      console.error("Error creating post:", error);
    },

    onSettled: () => {
      console.log("⚪ 게시글 작성 요청 완료");
    },
  });
};