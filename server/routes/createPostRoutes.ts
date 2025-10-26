import { Router } from 'express';
import { createPostController } from '../controllers/createPostController';

const router = Router();

router.post('/', createPostController);

export default router;
