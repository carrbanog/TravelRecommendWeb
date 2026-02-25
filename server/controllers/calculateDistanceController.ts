import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const calculateDistance = async (req: Request, res: Response) => {
  const { locations } = req.body; // 프론트에서 보낸 [{lat, lng}, ...] 배열

  if (!locations || locations.length < 2) {
    return res
      .status(400)
      .json({ error: "최소 두 개의 위치 정보가 필요합니다." });
  }

  try {
    // 1. Google Distance Matrix API 파라미터 준비
    // origins: 시작점들 (마지막 장소 제외)
    // destinations: 도착점들 (첫 번째 장소 제외)
    const origins = locations
      .slice(0, -1)
      .map((loc: any) => `${loc.lat},${loc.lng}`)
      .join("|");
    const destinations = locations
      .slice(1)
      .map((loc: any) => `${loc.lat},${loc.lng}`)
      .join("|");

    // 2. 구글 서버로 직접 요청
    const googleResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json`,
      {
        params: {
          origins,
          destinations,
          mode: "transit", // 대중교통 모드
          key: process.env.GOOGLE_MAP_API_KEY, // placeController와 동일한 키 사용
          language: "ko",
        },
      },
    );

    const data = googleResponse.data;

    if (data.status !== "OK") {
      return res
        .status(500)
        .json({ error: "구글 API 응답 에러", details: data.error_message });
    }

    // 3. 프론트엔드가 쓰기 좋게 데이터 가공
    // 결과가 순차적(0->1, 1->2...)이므로 각 행의 대각선 요소를 추출하거나
    // Google API의 행/열 인덱스 특성에 맞춰 가공합니다.
    const formattedResult: Record<
      number,
      { duration: string; distance: string }
    > = {};

    data.rows.forEach((row: any, idx: number) => {
      // 순차 이동이므로 row[idx]의 element[idx]가 해당 구간의 정보입니다.
      const element = row.elements[idx];

      if (element.status === "OK") {
        formattedResult[idx] = {
          duration: element.duration.text,
          distance: element.distance.text,
        };
      } else {
        formattedResult[idx] = {
          duration: "정보 없음",
          distance: "-",
        };
      }
    });

    res.status(200).json(formattedResult);
  } catch (error) {
    console.error("거리 계산 중 에러 발생:", error);
    res.status(500).json({ error: "서버 내부 에러" });
  }
};
