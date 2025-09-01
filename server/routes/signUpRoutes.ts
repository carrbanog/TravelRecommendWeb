import { Router } from "express";
import { postSignUp } from "../controllers/signUpController";

const router = Router();

router.post("/", postSignUp);

export default router;
