import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "@/entities/post/api/postApi";

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
  });
};
