import { useComments } from "../model/useComments";
import type { Comment } from "../model/type"

// --- 1. 개별 댓글 아이템 컴포넌트 (Internal Component) ---
interface ItemProps {
  comment: Comment;
  userEmail?: string; // 본인 확인용
}

const CommentItem = ({ comment, userEmail }: ItemProps) => {
  const isMyComment = userEmail === comment.author;
  console.log("Rendering CommentItem:", comment, "isMyComment:", isMyComment);
  return (
    <div className="py-4 border-b border-slate-100 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-slate-700">
            {comment.author.split('@')[0]} {/* 이메일 앞부분만 노출 예시 */}
          </span>
          {isMyComment && (
            <span className="text-[10px] bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded border border-sky-100">
              내 댓글
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
        {comment.content}
      </p>

      {/* 나중에 삭제 버튼이 들어갈 자리 */}
      {isMyComment && (
        <div className="flex justify-end mt-2">
          <button className="text-xs text-rose-400 hover:text-rose-600 transition-colors">
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

// --- 2. 전체 댓글 리스트 컴포넌트 (Export) ---
interface ListProps {
  postId: string;
  userEmail?: string;
}

export const CommentList = ({ postId, userEmail }: ListProps) => {
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