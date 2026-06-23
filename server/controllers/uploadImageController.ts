import { Request, Response } from 'express';

// ★ 핵심: Multer 타입을 직접 import 합니다.
import multer from 'multer'; 

export const uploadImageController = (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File; 
  console.log("업로드된 파일 정보:", file);
  
  if (!file) {
    return res.status(400).json({ message: "파일 업로드에 실패했습니다." });
  }

  // ⭐ 배포 환경(production)인지 로컬 개발 환경인지에 따라 기본 도메인 주소 분기 처리
  const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://travelrecommendweb-server.onrender.com' // 내 실제 Render 주소
    : `${req.protocol}://${req.get('host')}`;         // 로컬일 때는 기존대로 localhost:5000

  // 최종 이미지 URL 완성
  const imageUrl = `${BASE_URL}/uploads/${file.filename}`;
  
  res.status(200).json({ url: imageUrl });
};