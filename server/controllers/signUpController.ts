import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";

export const postSignUp = async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirm } = req.body;

  try {
    // 1. 유효성 검사
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "비밀번호가 맞지 않습니다." });
    }
    // 2. 이메일 중복 확인
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "이메일이 이미 존재합니다." });
    }
    // 3. 비밀번호 해싱
    const hashedPassowrd = await bcrypt.hash(password, 10);

    // 4. 새로운 유저 인스턴스 생성성
    const newUser = new User({
      username: req.body.name,
      email: req.body.email,
      password: hashedPassowrd,
    });
    // 서버 콘솔에 데이터 출력
    console.log("유저 정보: ", newUser);
    await newUser.save();

    // 클라이언트에 응답
    res
      .status(201)
      .json({ message: "회원가입이 완료되었습니다.", user: { email } });
  } catch (error) {
    console.log("회원가입 중 에러 발생", error);
  }
};
