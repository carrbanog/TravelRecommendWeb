import axios, { AxiosResponse } from "axios"; // AxiosResponse 추가
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAP_API_KEY;

export const calculateDistance = async (req: Request, res: Response) => {
  try {
    const { locations } = req.body;

    if (!locations || locations.length < 2) {
      return res.status(200).json({ distances: [] });
    }

    // ✅ 수정된 부분: 배열의 타입을 명시적으로 지정
    const promises: Promise<AxiosResponse<any>>[] = [];

    for (let i = 0; i < locations.length - 1; i++) {
      const origin = `${locations[i].lat},${locations[i].lng}`;
      const destination = `${locations[i + 1].lat},${locations[i + 1].lng}`;

      const request = axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json`,
        {
          params: {
            origins: origin,
            destinations: destination,
            mode: "transit",
            language: "ko",
            key: GOOGLE_MAPS_API_KEY,
          },
        },
      );
      promises.push(request); // 이제 오류 없이 들어갑니다!
    }

    const responses = await Promise.all(promises);

    const results = responses.map((response, i) => {
      // ✅ response의 타입이 정상적으로 추론되어 data 속성을 사용할 수 있습니다.
      const data = response.data;

      // Google API의 상세한 응답 구조를 체크
      if (data.status === "OK" && data.rows[0]?.elements[0]?.status === "OK") {
        const element = data.rows[0].elements[0];
        return {
          fromIndex: i,
          toIndex: i + 1,
          distanceText: element.distance.text,
          durationText: element.duration.text,
          mode: "transit",
        };
      } else {
        return {
          fromIndex: i,
          toIndex: i + 1,
          distanceText: "? km",
          durationText: "경로 없음",
          mode: "unknown",
        };
      }
    });
    console.log("계산된 거리 결과:", results);
    res.status(200).json({ distances: results });
  } catch (error) {
    console.error("거리 계산 중 서버 에러:", error);
    res
      .status(500)
      .json({ message: "서버에서 거리를 계산하는 중 오류가 발생했습니다." });
  }
};
