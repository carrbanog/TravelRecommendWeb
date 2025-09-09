import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import signUpRoutes from "./routes/signUpRoutes";
import loginRoutes from "./routes/loginRoutes";

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.json());
const mongoURL = process.env.MONGODB_URL;

if (!mongoURL) {
  // mongoURL이 존재하지 않을 때
  console.error("MongoDB URL is not defined in .env file.");
  process.exit(1); // 애플리케이션 종료
}

mongoose
  .connect(mongoURL)
  .then(() => console.log("DB 연결 성공"))
  .catch((err) => console.log("DB 연결 실패:", err));

app.use("/signup", signUpRoutes);
app.use("/login", loginRoutes);

app.listen(5000, () => {
  console.log("서버 실행 중: http://localhost:5000");
});
