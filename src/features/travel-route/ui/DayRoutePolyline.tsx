import { useMemo } from "react";
import { Polyline } from "@react-google-maps/api";
import polyline from "@mapbox/polyline"; // ✅ 좌표 해독 라이브러리
import { useFetchDistanceQuery } from "@/features/calculate-distance/api/fetchDistance";
import type { PlanPlace } from "@/entities/place/model/type";

interface DayRoutePolylineProps {
  dayPlanId: number;
  places: PlanPlace[] | undefined;
  color: string;
}

export const DayRoutePolyline = ({ dayPlanId, places, color }: DayRoutePolylineProps) => {
  // 1. 좌표 데이터 추출
  const locations = useMemo(() => 
    places?.map((place) => place.nearCoordinates) || []
  , [places]);

  // 2. React Query 호출 (TravelDayList와 동일한 키를 사용하여 캐시 공유)
  const { data: routeData } = useFetchDistanceQuery(locations);
  console.log("DayRoutePolyline Route Data:", routeData, dayPlanId, places);
  // 3. 서버에서 받은 데이터를 기반으로 Polyline 데이터 가공
  const routePaths = useMemo(() => {
    if (!routeData?.distances) return [];

    // 모든 구간(distance)의 모든 단계(step)를 평탄화하여 배열로 만듭니다.
    return routeData.distances.flatMap((distance: any) =>
      distance.steps.map((step: any) => {
        // ✅ 서버의 encoded polyline을 [{lat, lng}, ...] 형태로 해독
        const decodedPoints = polyline.decode(step.polyline);
        const path = decodedPoints.map(([lat, lng]) => ({ lat, lng }));

        return {
          path,
          mode: step.mode, // WALKING, TRANSIT 등
        };
      })
    );
  }, [routeData]);

  if (routePaths.length === 0) return null;

  return (
    <>
      {routePaths.map((route, idx) => {
        const isWalking = route.mode === "WALKING";

        return (
          <Polyline
            key={`${dayPlanId}-path-${idx}`}
            path={route.path}
            options={{
              // ✅ 도보 구간은 회색 계열, 그 외(지하철/버스)는 날짜별 고유 색상 적용
              strokeColor: isWalking ? "#94a3b8" : color,
              strokeWeight: isWalking ? 4 : 6,
              strokeOpacity: 0.8,
              // ✅ 도보일 경우 점선(Dashed) 스타일 적용 (선택 사항)
              icons: isWalking
                ? [
                    {
                      icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 2 },
                      offset: "0",
                      repeat: "10px",
                    },
                  ]
                : [],
            }}
          />
        );
      })}
    </>
  );
};