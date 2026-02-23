// server/controllers/placeController.ts
import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

export const getPlaceDetails = async (req: Request, res: Response) => {
  const { placeId } = req.query;

  if (!placeId) {
    return res.status(400).json({ error: "placeId가 필요합니다." });
  }

  try {
    // 1. 서버에서 구글 서버로 직접 요청 (CORS 영향 없음)
    const googleResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeId,
          // 설명(editorial_summary)과 평점, 사진 정보를 명시
          fields: "name,editorial_summary,photos,rating,vicinity",
          key: process.env.GOOGLE_MAP_API_KEY, // 환경변수에서 API 키 가져오기
          language: "ko", // 한국어 설명 요청
        },
      },
    );

    res.status(200).json(googleResponse.data.result);
  } catch (error) {
    console.error("구글 API 호출 중 에러 발생:", error);
    res.status(500).json({ error: "서버 내부 에러" });
  }
};
