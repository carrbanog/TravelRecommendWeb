import { Router } from "express";
import { postLogout } from "../controllers/logoutController";

const router = Router();

router.post("/", postLogout);

export default router;
