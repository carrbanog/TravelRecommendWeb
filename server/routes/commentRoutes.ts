import {Router} from "express";
import { createComment, deleteCommentById, getCommentsByPostId } from "../controllers/commentController";

const router = Router();

router.post("/:postId", createComment);
router.get("/:postId/comments", getCommentsByPostId);
router.delete("/:postId/:commentId", deleteCommentById);

export default router;