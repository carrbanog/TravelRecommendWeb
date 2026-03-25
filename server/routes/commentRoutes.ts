import {Router} from "express";
import { createComment } from "../controllers/commentController";

const router = Router();

router.post("/:postId", createComment);

export default router;