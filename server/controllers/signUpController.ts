import { Request, Response } from "express";

export const postSignUp = (req: Request, res: Response) => {
  const { name, email, password, passwordConfirm } = req.body;

  // 서버 콘솔에 데이터 출력
  console.log("받은 데이터:", { email, password });

  // 클라이언트에 응답
  res.status(200).json({ message: "Signup successful", user: { email } });
};
