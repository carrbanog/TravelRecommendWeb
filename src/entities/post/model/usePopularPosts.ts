// src/entities/post/model/usePopularPosts.ts
import { useQuery } from "@tanstack/react-query";
import { fetchPopularPosts } from "../api/postApi";

export const usePopularPosts = () => {
  return useQuery({
    queryKey: ["posts", "popular"], // 쿼리 키를 일반 리스트와 분리
    queryFn: fetchPopularPosts,
    staleTime: 1000 * 60 * 5, // 인기글은 자주 변하지 않으므로 5분간 캐싱
  });
};