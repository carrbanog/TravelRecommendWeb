import { useState } from "react";
import { useCreateComment } from '../model/useCreateComment';

interface Props {
  postId: string;
  userEmail: string;
}

// 댓글 입력 폼 컴포넌트
export const CommentForm = ({ postId, userEmail }: Props) => {
  const [content, setContent] = useState("");

const { mutate: createComment, isPending: isCreating } = useCreateComment(postId, userEmail);

  const handleSubmit = () => {
    if (!content.trim() || isCreating) return;
    createComment({ content }, {
      onSuccess: () => setContent(""), // 성공 시 입력 필드 초기화
    });
  };

  return (
    <div className="space-y-3 mt-8">
      {/* 작성자 정보 표시 (선택 사항) */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <span className="font-medium text-slate-700">{userEmail}</span>
        <span>님으로 댓글 남기는 중</span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="따뜻한 댓글을 남겨주세요."
        className="w-full min-h-[120px] p-4 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400"
      />

      <div className="flex justify-end items-center gap-4">
        {/* 남은 글자 수 표시 같은 피드백을 추가하면 더 좋습니다 */}
        <button
          onClick={handleSubmit}
          disabled={isCreating || !content.trim()}
          className="px-6 py-2.5 bg-sky-500 text-white font-medium rounded-md hover:bg-sky-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
        >
          {isCreating ? "등록 중..." : "댓글 등록"}
        </button>
      </div>
    </div>
  );
};