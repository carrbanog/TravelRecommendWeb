import multer from 'multer';
import path from 'path';
import fs from 'fs';

// 이미지가 저장될 폴더 (서버 루트 기준)
const uploadDir = 'uploads/';

// 폴더가 없으면 자동으로 생성하는 로직
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // 파일명 중복 방지 (현재시간 + 랜덤값)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });