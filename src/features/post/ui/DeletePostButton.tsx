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
    // 명확하게 postId를 인자로 넘기도록 수정
    mutationFn: () => deletePost(postId), 
    onSuccess: () => {
      alert("게시글이 삭제되었습니다.");
      // 삭제된 데이터가 목록에 남지 않도록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/community", { replace: true });
    },
    onError: (error) => {
      console.error("Delete Error:", error);
      alert("삭제 중 오류가 발생했습니다.");
    },
  });

  const handleDelete = () => {
    // 로딩 중(삭제 중)에는 중복 클릭 방지
    if (isPending) return; 

    if (window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      deleteMutate();
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      // isPending일 때 버튼을 비활성화하고 로딩 아이콘을 보여줌
      disabled={isPending} 
      className="flex items-center gap-2 min-w-[100px] transition-all"
    >
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>삭제 중...</span>
        </>
      ) : (
        <>
          <Trash2 className="w-4 h-4" />
          <span>삭제하기</span>
        </>
      )}
    </Button>
  );
};