import React from 'react'
import {useQuery} from '@tanstack/react-query'

import {fetchPosts} from "../../../entities/post/api/postApi";
import { useNavigate } from 'react-router-dom';
import type { Post } from "../../../entities/post/model/postTypes"

const PostList = () => {
  const navigate = useNavigate();
  const {data: posts, isLoading, error} = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
  console.log(posts, isLoading, error)
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">전체 게시글</h2>
        <button
          onClick={() => navigate("/post/create")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          새 게시글 작성
        </button>
      </div>

      <ul className="divide-y divide-gray-200">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <li
              className="py-4 cursor-pointer hover:bg-gray-50 transition"
              // onClick={() => navigate(`/post/${post._id}`)}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-800">{post.title}</span>
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">작성자: {post.author}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">게시글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default PostList
