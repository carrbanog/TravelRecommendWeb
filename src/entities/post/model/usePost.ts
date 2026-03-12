import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../api/postApi";

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
  });
};
