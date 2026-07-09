import { useComments } from "@/entities/comment/model/useComments";
import { CommentItem } from "@/entities/comment/ui/CommentItem";

interface CommentListProps {
  postId: string;
  userEmail?: string;
}

// 전체 댓글 리스트 컴포넌트
export const CommentList = ({ postId, userEmail }: CommentListProps) => {
  // 엔티티 모델에서 만든 훅 사용
  const { data: comments = [], isLoading, isError } = useComments(postId);
  console.log("CommentList - useComments 결과:", {
    comments,
    isLoading,
    isError,
  });
  if (isLoading) {
    return (
      <div className="py-10 flex justify-center items-center gap-2 text-slate-400 text-sm">
        <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
        댓글을 불러오는 중입니다...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-rose-400 text-sm">
        댓글을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  return (
    // 💡 전체 댓글 영역을 하나의 독립된 구역인 <section>으로 변경
    <section className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-bold text-slate-900">댓글</h3>
        <span className="text-sky-500 font-medium">{comments.length}</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 px-6 shadow-sm">
        {comments.length > 0 ? (
          // 💡 실제 목록(List) 데이터이므로 <ul>과 <li> 구조를 적용하여 스크린 리더 최적화
          <ul className="divide-y divide-slate-100 last:border-b-0">
            {comments.map((comment) => (
              <li key={comment.commentId}>
                <CommentItem comment={comment} userEmail={userEmail} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center text-slate-400 text-sm">
            아직 작성된 댓글이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
};
