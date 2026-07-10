import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

// .env 파일의 환경변수를 로드합니다.
dotenv.config();

// 1. Cloudinary 설정 인증
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// 2. multer가 디스크 대신 Cloudinary를 바라보도록 스토리지 생성
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'travel_recommend', // Cloudinary 대시보드에 생성될 폴더 이름
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // 허용할 확장자
      // public_id를 지정하지 않으면 Cloudinary가 중복되지 않는 랜덤한 파일명을 자동으로 생성해 줍니다.
    };
  },
});

// 3. 수정된 스토리지를 사용하는 multer 익스포트
export const upload = multer({ storage });