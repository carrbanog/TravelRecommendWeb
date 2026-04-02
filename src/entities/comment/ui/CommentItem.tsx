// --- 1. 개별 댓글 아이템 컴포넌트 (Internal Component) ---
import { deleteCommentApi } from '../api/commentAPi';
import type { Comment } from "../model/type";
import { useDeleteComment } from '../model/useComments';

interface ItemProps {
  comment: Comment;
  userEmail?: string; // 본인 확인용
}

// 댓글 하나를 렌더링하는 컴포넌트
export const CommentItem = ({ comment, userEmail }: ItemProps) => {
  const isMyComment = userEmail === comment.author;
  // console.log("Rendering CommentItem:", comment, "isMyComment:", isMyComment);
  const {mutate: deleteMutate, isPending} = useDeleteComment(comment.postId, comment.commentId);
  const handleDelete = () => {
    if(window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      deleteMutate();
    }
  }
  return (
    <div className="py-4 border-b border-slate-100 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-slate-700">
            {comment.author}
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

      {isMyComment && (
        <div className="flex justify-end mt-2">
          <button className="text-xs text-rose-400 hover:text-rose-600 transition-colors" onClick={handleDelete} disabled={isPending}>
            삭제
          </button>
        </div>
      )}
    </div>
  );
};
