import express from "express";
import cors from "cors";
import signUpRoutes from "./routes/signUpRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/signup", signUpRoutes);

app.listen(5000, () => {
  console.log("서버 실행 중: http://localhost:5000");
});
