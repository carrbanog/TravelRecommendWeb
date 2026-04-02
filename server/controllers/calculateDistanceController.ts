import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAP_API_KEY;

// 🌟 핵심 트릭: 구글을 속이기 위한 '가짜 출발 시간' 생성기
// 유저가 언제 검색하든, 가장 배차가 안정적인 "다음 주 수요일 낮 12시"를 기준으로 기차를 찾게 만듭니다.
const getGoldenTime = () => {
  const date = new Date();
  // 현재 요일에 상관없이 다가오는 수요일로 강제 이동 (주말/공휴일 배차 문제 회피)
  date.setDate(date.getDate() + ((3 + 7 - date.getDay()) % 7 || 7));
  date.setHours(12, 0, 0, 0); // 낮 12시 정각
  return Math.floor(date.getTime() / 1000); // 구글 API가 요구하는 초 단위 타임스탬프
};

// 🌟 경로 상세 정보를 가져오는 헬퍼 함수
const getDetailedRoute = async (
  origin: string,
  destination: string,
  index: number,
) => {
  const modes = ["transit", "walking"];

  for (const mode of modes) {
    try {
      const params: any = {
        origin,
        destination,
        mode,
        language: "ko",
        key: GOOGLE_MAPS_API_KEY,
      };

      if (mode === "transit") {
        params.departure_time = Math.floor(Date.now() / 1000) + 48 * 60 * 60;
      }

      const response: AxiosResponse<any> = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json`,
        { params },
      );

      const data = response.data;

      if (data.status === "OK" && data.routes.length > 0) {
        const leg = data.routes[0].legs[0];

        // ✅ 모든 모드에서 steps를 돌면서 상세 정보와 polyline을 추출합니다.
        const detailedSteps = leg.steps.map((step: any) => {
          const baseData = {
            mode: step.travel_mode,
            instruction: step.html_instructions
              ? step.html_instructions.replace(/<[^>]*>?/gm, "")
              : "이동",
            duration: step.duration.text,
            // 🌟 핵심: 지도를 그리기 위해 각 단계의 polyline을 반드시 포함합니다.
            polyline: step.polyline.points,
          };

          if (step.travel_mode === "TRANSIT") {
            const transit = step.transit_details;
            return {
              ...baseData,
              mode: "TRANSIT",
              instruction: `${transit.departure_stop.name}에서 ${transit.line.short_name || transit.line.name} 탑승 👉 ${transit.arrival_stop.name} 하차`,
            };
          } else if (step.travel_mode === "WALKING") {
            return {
              ...baseData,
              mode: "WALKING",
              instruction: `도보 이동 (${step.distance.text})`,
            };
          }
          return baseData;
        });

        return {
          fromIndex: index,
          toIndex: index + 1,
          distanceText: leg.distance.text,
          durationText: leg.duration.text,
          mode: mode, // 'transit' 또는 'walking'
          steps: detailedSteps,
        };
      }
      // 실패 시 디버깅 로그 부분 동일...
    } catch (error) {
      console.error(`[Mode: ${mode}] API 에러:`, error);
    }
  }

  return {
    fromIndex: index,
    toIndex: index + 1,
    distanceText: "? km",
    durationText: "경로 없음",
    mode: "unknown",
    steps: [],
  };
};

export const calculateDistance = async (req: Request, res: Response) => {
  try {
    const { locations } = req.body;

    if (!locations || locations.length < 2) {
      return res.status(200).json({ distances: [] });
    }

    const promises: Promise<any>[] = [];

    for (let i = 0; i < locations.length - 1; i++) {
      const origin = `${locations[i].lat},${locations[i].lng}`;
      const destination = `${locations[i + 1].lat},${locations[i + 1].lng}`;

      promises.push(getDetailedRoute(origin, destination, i));
    }

    const results = await Promise.all(promises);

    console.log("계산된 상세 거리 결과:", JSON.stringify(results, null, 2));
    res.status(200).json({ distances: results });
  } catch (error) {
    console.error("거리 계산 중 서버 에러:", error);
    res
      .status(500)
      .json({ message: "서버에서 거리를 계산하는 중 오류가 발생했습니다." });
  }
};
