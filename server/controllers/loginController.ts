import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(404).json({ error: "계정이 없습니다." });
    }

    const passOk = await bcrypt.compare(password, userDoc.password);

    if (!passOk) {
      return res.status(422).json({ error: "비밀번호가 틀렸습니다." });
    }

    const token = jwt.sign(
      { id: userDoc._id, email: userDoc.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
    });
    return res.json({ message: "로그인 성공", userDoc });
    console.log(`token: ${JSON.stringify(jwt.decode(token))}`);
  } catch (error) {
    console.log("로그인 오류", error);
    return res.status(500).json({ error: "서버 오류" });
  }
};
