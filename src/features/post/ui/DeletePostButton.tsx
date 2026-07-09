import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deletePost } from "@/entities/post/api/postApi";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
      toast.success("게시글이 삭제되었습니다.", { position: "top-right" });
      // 삭제된 데이터가 목록에 남지 않도록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/community", { replace: true });
    },
    onError: (error) => {
      console.error("Delete Error:", error);
      toast.error("삭제 중 오류가 발생했습니다.", { position: "top-right" });
    },
  });

  const handleDelete = () => {
    // 로딩 중(삭제 중)에는 중복 클릭 방지
    if (isPending) return;
    deleteMutate();
  };

  return (
    <AlertDialog>
      {/* 💡 1. 트리거가 기존 버튼 역할을 대신하며 모달을 엽니다. */}
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
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
      </AlertDialogTrigger>

      {/* 💡 2. 확인 창 콘텐츠 구성 */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            정말 이 게시글을 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            삭제된 게시글은 복구할 수 없으며, 모든 데이터가 영구적으로
            삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* 취소 버튼 */}
          <AlertDialogCancel disabled={isPending}>취소</AlertDialogCancel>
          {/* 💡 3. '확인' 액션 버튼 클릭 시 실제 삭제 함수를 실행합니다. */}
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
