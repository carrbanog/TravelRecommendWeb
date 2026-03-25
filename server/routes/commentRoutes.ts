import {Router} from "express";
import { createComment, getCommentsByPostId } from "../controllers/commentController";

const router = Router();

router.post("/:postId", createComment);
router.get("/:postId/comments", getCommentsByPostId);

export default router;