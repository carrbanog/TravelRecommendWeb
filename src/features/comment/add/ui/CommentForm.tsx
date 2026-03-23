import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/shared/ui/button";
// import { Textarea } from "@/shared/ui/textarea";

export const CommentForm = ({
  postId,
  userEmail,
}: {
  postId: string;
  userEmail: string;
}) => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newComment: { content: string }) => {
      // API 호출 가정
      // return await apiClient.post(`/posts/${postId}/comments`, { ...newComment, author: userEmail });
    },
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  return (
    <div className="space-y-3 mt-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="따뜻한 댓글을 남겨주세요."
        // 너비 가득 채우기, 최소 높이, 테두리 추가
        className="w-full min-h-[100px] p-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <div className="flex justify-end">
        <button
          disabled={isPending || !content.trim()}
          onClick={() => mutate({ content })}
        >
          댓글 등록
        </button>
      </div>
    </div>
  );
};
