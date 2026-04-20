import { Request, Response } from "express";
import { Post } from "../models/Post";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    // .select("-content") 를 붙이면 content 필드만 제외하고 모두 가져옵니다.
    // 또는 .select("title author createdAt") 처럼 필요한 것만 명시해도 됩니다.
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select("-content"); 

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post)
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "오류 발생", error });
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`삭제 요청된 게시글 ID: ${id}`);
    const post = await Post.findByIdAndDelete(id);
    console.log("삭제된 게시글 정보:", post);
    if (!post)
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    res.status(200).json({ message: "게시글이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "오류 발생", error });
  }
};
