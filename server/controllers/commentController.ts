import { Request, Response } from "express";
const { Comment } = require("../models/Comment");

export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content, author } = req.body;
    if (!content || !author) {
      return res.status(400).json({ message: "댓글 내용을 입력해주세요" });
    }
    const newComment = new Comment({
      postId,
      content,
      author,
    });
    const savedComment = await newComment.save();
    console.log("새 댓글이 저장되었습니다:", savedComment);

    res.status(201).json({
      message: "댓글이 성공적으로 추가되었습니다",
      comment: savedComment,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ 에러 발생:", error.message); // 이제 .message를 쓸 수 있습니다.
      res.status(500).json({ message: error.message });
    } else {
      // Error 객체가 아닌 엉뚱한 게 던져졌을 경우 처리
      res.status(500).json({ message: "알 수 없는 에러가 발생했습니다." });
    }
  }
};

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    console.log(`게시글 ID ${postId}에 대한 댓글이 조회되었습니다:`, comments);
    res.status(200).json(comments);
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ 에러 발생:", error.message);
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "알 수 없는 에러가 발생했습니다." });
    }
  }
};

export const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const { postId, commentId } = req.params;
    // console.log(`댓글 삭제 요청이 들어왔습니다. postId: ${postId}, commentId: ${commentId}`);
    const comment = await Comment.findOneAndDelete(commentId);
    console.log(comment)
    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }
    res.status(200).json({ message: "댓글이 삭제되었습니다.", content: comment.content });
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ 에러 발생:", error.message);
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "알 수 없는 에러가 발생했습니다." });
    }
  }
};
