import { Request, Response } from "express";
import { Post } from '../models/Post';

// POST /posts 요청 처리
export const createPostController = async (req: Request, res: Response) => {
  const { title, content, author } = req.body;

  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "제목과 내용을 모두 입력해주세요" });
    }
    const newPost = new Post({title, content, author});
    await newPost.save();
    console.log("세 게시글 저장됨");
    res.status(201).json({
      message: "게시글이 성공적으로 저장되었습니다.",
      data:newPost,
    })
  } catch (error) {
    console.error("게시글 저장 중 오류")
    res.status(500).json({message: "서버 오류가 발생했습니다."})
  }
};
