import { Request, Response } from 'express';

// ★ 핵심: Multer 타입을 직접 import 합니다.
import multer from 'multer'; 

export const uploadImageController = (req: Request, res: Response) => {
  // req를 'any'로 잠시 형변환하거나, 아래처럼 file 속성을 명시합니다.
  const file = req.file as Express.Multer.File; 
  console.log("업로드된 파일 정보:", file);
  if (!file) {
    return res.status(400).json({ message: "파일 업로드에 실패했습니다." });
  }

  // 파일이 존재할 때의 로직
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
  
  res.status(200).json({ url: imageUrl });
};