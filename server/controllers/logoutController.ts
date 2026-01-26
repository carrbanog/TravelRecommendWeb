import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const postLogout = (req: Request, res: Response) => {
  try {
    // 1. 쿠키 삭제
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    // 2. 성공 응답 반환
    return res.status(200).json({ message: "로그아웃 성공" });
  } catch (error) {
    console.log("로그아웃 오류", error);
    return res.status(500).json({ error: "서버 오류" });
  }
};
