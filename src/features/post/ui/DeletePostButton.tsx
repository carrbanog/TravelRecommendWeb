import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deletePost } from "@/entities/post/api/postApi";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

interface DeletePostButtonProps {
  postId: string;
}

export const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      alert("게시글이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/community", { replace: true });
    },
    onError: () => alert("삭제 중 오류가 발생했습니다."),
  });

  const handleDelete = () => {
    if (window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      deleteMutate(postId);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      삭제하기
    </Button>
  );
};