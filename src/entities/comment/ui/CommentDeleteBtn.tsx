import type { Comment } from "../../../entities/comment/model/type";

interface CommentDeleteBtnProps {
  comment: Comment;
}

export const CommentDeleteBtn = ({ comment }: CommentDeleteBtnProps) => {
  console.log("Rendering CommentDeleteBtn for comment:", comment);
  return (
    <div className="flex justify-end mt-2">
      <button className="text-xs text-rose-400 hover:text-rose-600 transition-colors">
        삭제
      </button>
    </div>
  );
};
