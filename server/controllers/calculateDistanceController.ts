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
        origin: origin,
        destination: destination,
        mode: mode,
        language: "ko",
        key: GOOGLE_MAPS_API_KEY,
      };

      // ✅ 날짜 계산 복잡하게 하지 않고, 무조건 '현재 시간으로부터 48시간 뒤'로 못 박습니다.
      // (서버 타임존 문제 원천 차단)
      if (mode === "transit") {
        params.departure_time = Math.floor(Date.now() / 1000) + 48 * 60 * 60;
      }

      const response: AxiosResponse<any> = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json`,
        { params },
      );

      const data = response.data;

      // Directions API 응답 성공 시
      if (data.status === "OK" && data.routes.length > 0) {
        const leg = data.routes[0].legs[0];

        let detailedSteps: {
          mode: string;
          instruction: string;
          duration: string;
        }[] = [];

        if (mode === "walking") {
          detailedSteps = [
            {
              mode: "WALKING",
              instruction: "도보 이동",
              duration: leg.duration.text,
            },
          ];
        } else {
          detailedSteps = leg.steps.map((step: any) => {
            if (step.travel_mode === "TRANSIT") {
              const transit = step.transit_details;
              return {
                mode: "TRANSIT",
                instruction: `${transit.departure_stop.name}에서 ${transit.line.name} 탑승 👉 ${transit.arrival_stop.name} 하차`,
                duration: step.duration.text,
              };
            } else if (step.travel_mode === "WALKING") {
              return {
                mode: "WALKING",
                instruction: `도보 이동 (${step.distance.text})`,
                duration: step.duration.text,
              };
            } else {
              return {
                mode: step.travel_mode,
                instruction: step.html_instructions
                  ? step.html_instructions.replace(/<[^>]*>?/gm, "")
                  : "이동",
                duration: step.duration.text,
              };
            }
          });
        }

        return {
          fromIndex: index,
          toIndex: index + 1,
          distanceText: leg.distance.text,
          durationText: leg.duration.text,
          mode: mode,
          steps: detailedSteps,
        };
      } else {
        // 🚨 [핵심 디버깅] 구글이 대중교통을 거절한 진짜 이유를 출력합니다!
        console.log(`\n🚨 [${mode} 실패] ${origin} 👉 ${destination}`);
        console.log(`상태 코드(Status): ${data.status}`);
        if (data.error_message)
          console.log(`에러 메시지: ${data.error_message}`);
        console.log(`--------------------------------------------------\n`);
      }
    } catch (error) {
      console.error(`[Mode: ${mode}] Directions API 에러:`, error);
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
