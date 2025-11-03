import React from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchPosts } from "../../../entities/post/api/postApi";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../../entities/post/model/postTypes";

const PostList = () => {
  const navigate = useNavigate();
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        로딩 중...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        에러가 발생했습니다 😢
      </div>
    );
    console.log(posts)
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 게시글 영역 */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 py-6">
        <div className="w-full max-w-5xl bg-white border rounded-md shadow-sm flex flex-col overflow-hidden h-full">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-12 border-b bg-gray-100 text-gray-700 font-semibold text-sm py-3 px-4 shrink-0">
            <div className="col-span-7">제목</div>
            <div className="col-span-3 text-center">작성자</div>
            <div className="col-span-2 text-right">작성일</div>
          </div>

          {/* 게시글 목록 */}
          <ul className="flex-1 overflow-y-auto">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <li
                  key={post._id}
                  onClick={() => navigate(`/post/${post._id}`)}
                  className="grid grid-cols-12 py-3 px-4 border-b hover:bg-blue-50 cursor-pointer transition"
                >
                  <div className="col-span-7 truncate text-gray-800 font-medium hover:text-blue-700">
                    {post.title}
                  </div>
                  <div className="col-span-3 text-center text-gray-600">
                    {post.author}
                  </div>
                  <div className="col-span-2 text-right text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                  </div>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500 py-8">
                게시글이 없습니다.
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* 하단 버튼 (고정) */}
      <div className="flex justify-center py-4 bg-gray-50 border-t border-gray-200">
        <button
          onClick={() => navigate("/post/create")}
          className="px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          style={{ backgroundColor: "rgb(59 130 246 / var(--tw-bg-opacity))" }}
        >
          새 게시글 작성
        </button>
      </div>
    </div>
  );
};

export default PostList;
