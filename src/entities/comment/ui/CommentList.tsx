import { useComments } from "../model/useComments";
import { CommentItem } from "./CommentItem";

// --- 2. 전체 댓글 리스트 컴포넌트 (Export) ---
interface CommentListProps {
  postId: string;
  userEmail?: string;
}

export const CommentList = ({ postId, userEmail }: CommentListProps) => {
  // 엔티티 모델에서 만든 훅 사용
  const { data: comments = [], isLoading, isError } = useComments(postId);
  console.log("CommentList - useComments 결과:", { comments, isLoading, isError });
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
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-bold text-slate-900">댓글</h3>
        <span className="text-sky-500 font-medium">{comments.length}</span>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 px-6 shadow-sm">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              userEmail={userEmail} 
            />
          ))
        ) : (
          <div className="py-12 text-center text-slate-400 text-sm">
            아직 작성된 댓글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};