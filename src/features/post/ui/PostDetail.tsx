import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../../entities/post/api/postApi";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
  });

  if (isLoading)
    return <div className="flex justify-center py-10">로딩 중...</div>;
  if (error)
    return (
      <div className="flex justify-center py-10 text-red-500">에러 발생!</div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{post?.title}</h1>
      <p className="text-gray-700 mb-2">작성자: {post?.author}</p>
      <p className="text-gray-500 text-sm mb-4">
        작성일:{" "}
        {post?.createdAt
          ? new Date(post.createdAt).toLocaleString("ko-KR")
          : "작성일 없음"}
      </p>
      <div className="border-t pt-4 text-gray-800 whitespace-pre-line">
        {post?.content}
      </div>
    </div>
  );
};

export default PostDetail;
