import { createPost } from "../../../entities/post/api/postApi";
import type { Post } from "../../../entities/post/model/postTypes";
import { useState } from "react";

export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCreatePost = async (post: Post) => {
    console.log("Creating post:", post);
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await createPost(post);
      setSuccess(true);
    } catch (err) {
      setError("게시글 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };
  return { loading, success, error, handleCreatePost };
};
