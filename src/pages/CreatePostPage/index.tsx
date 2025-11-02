import React, { useState } from "react";
import { useCreatePost } from "../../entities/post/hooks/useCreatePost";
import type { CreatePost } from "../../entities/post/model/postTypes";
import { useAuth } from "../../app/providers/AuthProvider";
import { useNavigate } from 'react-router-dom';



function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { mutateAsync, isPending } = useCreatePost();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email) {
      alert("로그인이 필요합니다.");
      return;
    }

    const author = user.email.split("@")[0];

    const newPost: CreatePost = { title, content, author };
    try {
      await mutateAsync(newPost);
      setTitle("");
      setContent("");
      alert("게시글이 성공적으로 작성되었습니다!");
      navigate("/community");
    } catch (error) {
      alert("게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <main className="flex-1 p-5 overflow-y-auto bg-gray-50">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-full h-full">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">
            새 게시글 작성
          </h2>

          <form className="flex flex-col h-full" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-3">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="제목을 입력하세요"
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex-1 mb-8">
              <label className="block text-lg font-medium text-gray-700 mb-3">
                내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                placeholder="내용을 입력하세요"
                className="w-full h-[60vh] px-4 py-3 text-lg border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPending} // 요청이 진행 중이면 클릭 방지
                className={`bg-blue-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-600 transition-colors duration-200
              ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isPending ? "저장 중..." : "저장하기"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreatePostPage;
