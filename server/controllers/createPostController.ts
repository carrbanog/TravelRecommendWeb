import { Request, Response } from "express";

// POST /posts 요청 처리
export const createPostController = (req: Request, res: Response) => {
  const { title, content } = req.body;

  // 서버 콘솔에 출력
  console.log("POST 요청 받음:", { title, content });

  // DB 저장은 하지 않고, 성공 응답만 반환
  res.status(200).json({
    message: "게시글 POST 요청 확인 완료 (콘솔 확인)",
    data: { title, content },
  });
};
