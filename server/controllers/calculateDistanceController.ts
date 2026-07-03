import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAP_API_KEY;

// 🌟 핵심 트릭: 구글을 속이기 위한 '가짜 출발 시간' 생성기
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
  // 🔹 우선순위 규칙: 대중교통 우선 탐색 -> 데이터 없으면 자동차 -> 최후의 수단 도보
  const modes = ["transit", "driving", "walking"];

  for (const mode of modes) {
    try {
      const params: any = {
        origin,
        destination,
        mode,
        language: "ko",
        key: GOOGLE_MAPS_API_KEY,
      };

      // 대중교통 모드일 때만 골든 타임 스탬프를 주입합니다.
      if (mode === "transit") {
        params.departure_time = getGoldenTime();
      }

      const response: AxiosResponse<any> = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json`,
        { params },
      );

      const data = response.data;

      if (data.status === "OK" && data.routes.length > 0) {
        const leg = data.routes[0].legs[0];

        // 🚨 [핵심 안전장치] 대중교통(transit) 모드로 요청했는데, 
        // 결과 스텝 중에 실제 버스/지하철 탑승(TRANSIT)이 단 하나도 없고 "전부 도보"로만 되어 있다면?
        // 이름만 대중교통인 '사람 걷는 길'이므로 이 응답을 과감히 버리고 다음 루프(driving)로 넘깁니다.
        if (mode === "transit") {
          const hasTransitVehicle = leg.steps.some((step: any) => step.travel_mode === "TRANSIT");
          if (!hasTransitVehicle) {
            console.warn(`[구간 ${index}] 대중교통 수단 없음(전부 도보 경로). 다음 차량 모드로 전환합니다.`);
            continue; 
          }
        }

        let detailedSteps = [];

        // -------------------------------------------------------------
        // 1️⃣ [TRANSIT] 진짜 버스/지하철 탑승이 포함된 대중교통인 경우
        // -------------------------------------------------------------
        if (mode === "transit") {
          detailedSteps = leg.steps.map((step: any) => {
            const rawMode = step.travel_mode; // "WALKING" 또는 "TRANSIT"
            const stepPolyline = step.polyline ? step.polyline.points : "";

            const baseData = {
              mode: rawMode,
              instruction: step.html_instructions
                ? step.html_instructions.replace(/<[^>]*>?/gm, "")
                : "이동",
              duration: step.duration.text,
              polyline: stepPolyline, // 🌟 각 스텝 고유의 정밀 조각 좌표 바인딩
            };

            // 버스나 지하철일 경우 안내 문구를 직관적인 탑승 정보로 커스텀 가공
            if (rawMode === "TRANSIT") {
              const transit = step.transit_details;
              return {
                ...baseData,
                mode: "TRANSIT",
                instruction: `${transit.departure_stop.name}에서 ${transit.line.short_name || transit.line.name} 탑승 👉 ${transit.arrival_stop.name} 하차`,
              };
            } else if (rawMode === "WALKING") {
              return {
                ...baseData,
                mode: "WALKING",
                instruction: `도보 이동 (${step.distance.text})`,
              };
            }
            return baseData;
          });
        } 
        // -------------------------------------------------------------
        // 2️⃣ [DRIVING / WALKING] 대중교통 실패 혹은 미지원 지역인 경우 (일본 등)
        // -------------------------------------------------------------
        else {
          const modeLabel = mode === "driving" ? "차량" : "도보";
          
          // 자동차나 도보 모드일 때는 자잘한 골목길 안내를 생략하고 UI에 깔끔하게 한 줄로 출력되도록 요약 처리
          detailedSteps = [
            {
              mode: mode.toUpperCase(), // "DRIVING" 또는 "WALKING"
              instruction: `${modeLabel} 이동 · 약 ${leg.duration.text} (${leg.distance.text})`,
              duration: leg.duration.text,
              // 지도가 차가 다니는 실제 주행 대로망을 따라 이쁘게 그릴 수 있도록 통짜 경로 주입
              polyline: data.routes[0].overview_polyline.points, 
            }
          ];
        }

        console.log(`[구간 ${index}] 최종 매칭 성공 모드: '${mode}'`);

        return {
          fromIndex: index,
          toIndex: index + 1,
          distanceText: leg.distance.text,
          durationText: leg.duration.text,
          mode: mode, // 'transit', 'driving', 'walking'
          steps: detailedSteps,
        };
      }

      console.warn(`[Index: ${index}] Mode '${mode}' 결과 없음 (${data.status}). 다음 모드 탐색.`);
    } catch (error) {
      console.error(`[Mode: ${mode}] API 에러:`, error);
    }
  }

  // 모든 모드가 전부 실패했을 때 떨어지는 최후의 마지노선
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

    // 위젯에서 보낸 locations 형식에 따라 좌표 조립
    for (let i = 0; i < locations.length - 1; i++) {
      const origin = `${locations[i].lat},${locations[i].lng}`;
      const destination = `${locations[i + 1].lat},${locations[i + 1].lng}`;
      promises.push(getDetailedRoute(origin, destination, i));
    }

    const results = await Promise.all(promises);

    res.status(200).json({ distances: results });
  } catch (error) {
    console.error("거리 계산 중 서버 에러:", error);
    res
      .status(500)
      .json({ message: "서버에서 거리를 계산하는 중 오류가 발생했습니다." });
  }
};