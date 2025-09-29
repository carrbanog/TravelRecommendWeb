import { Request, Response } from "express";
import { fetchNearbyPlaces } from "../api/fetchNearbyPlaces";

// 주변 장소 정보를 요청하고 응답하는 컨트롤러 함수
const getNearbyPlaces = async (req: Request, res: Response) => {
  // 1. 클라이언트가 쿼리로 보낸 위도(lat), 경도(lng)를 추출
  const { lat, lng } = req.query;
  console.log(lat, lng);

  // 2. 위도 또는 경도 값이 없으면 400 에러 응답
  if (!lat || !lng) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude are required." });
  }

  try {
    // 3. 서비스(Model)에 데이터 처리를 요청
    // req.query의 값은 string | string[] | ParsedQs | ParsedQs[] 일 수 있으므로 string으로 변환합니다.
    const places = await fetchNearbyPlaces(String(lat), String(lng));
    // 4. 성공적으로 데이터를 받으면 200 상태 코드와 함께 JSON 데이터 응답
    res.status(200).json(places);
  } catch (error) {
    // 5. 서비스에서 에러가 발생하면 500 에러 응답
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export { getNearbyPlaces };
