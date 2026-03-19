import { Router } from 'express';
import { createPostController } from '../controllers/createPostController';
import { uploadImageController } from '../controllers/uploadImageController';
import { upload } from "../middleware/multerConfig";

const router = Router();

router.post('/', createPostController);
router.post('/upload-image', upload.single('image'), uploadImageController);

export default router;
