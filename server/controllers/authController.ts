import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "ddd";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    // console.log("Token from cookies:", token);
    if (!token) {
      return res.status(401).json({ message: "인증 토큰이 없습니다." });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as unknown as JwtPayload & {
      userId: string;
    };
    // console.log("Decoded token:", decoded.id);

    const user = await User.findOne({ email: decoded.email }).select("-password");
    // console.log("Fetched user:", user);
    res.json({
      user: { name: user?.username, email: user?.email },
      // token,
    });
  } catch (error) {
    console.error("프로필 조회 중 오류 발생:", error);
    return res.status(500).json({ message: "서버 오류" });
  }
};
