import { Router } from 'express';
import { deletePostById, getAllPosts, getPostById } from "../controllers/postController"
const router = Router();

router.get('/', getAllPosts);
router.get("/:id", getPostById);
router.delete("/:id", deletePostById);


export default router;