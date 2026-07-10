import { Request, Response } from 'express';



export const uploadImageController = (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File; 
  console.log("업로드된 파일 정보:", file);
  
  if (!file) {
    return res.status(400).json({ message: "파일 업로드에 실패했습니다." });
  }

  // ⭐ 핵심: Cloudinary 스토리지 환경에서는 file.path에 
  // 원격 저장소의 영구적인 이미지 URL(https://res.cloudinary.com/...)이 그대로 담겨있습니다.
  const imageUrl = file.path;
  res.status(200).json({ url: imageUrl });
};