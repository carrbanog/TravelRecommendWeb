//두 목적지의 이동 수단, 이동 방법, 이동 시간, polyline 정보를 담는 타입 정의
export type RouteStep = {
  mode: string; // 이동 수단 (예: "WALKING", "TRANSIT", "DRIVING")
  instruction: string; // 이동 방법에 대한 설명 (예: "Walk to bus stop", "Take bus 123")
  duration: string; // 이동 시간 (예: "15 mins")
  polyline: string; // 각 단계별 polyline 정보 (지도에 그리기 위해 필요)
};

// 전체 거리, 시간, step(새부 정보) 를 담는 타입 정의
export type RouteDistance = {
  fromIndex: number;
  toIndex: number;
  distanceText: string;
  durationText: string;
  mode: string;
  steps: RouteStep[];
};

// 하루 여행 계획의 전체 경로 정보를 담는 타입 정의
export type DayRouteData = {
  distances: RouteDistance[];
};

export type distanceResponse = DayRouteData; // 서버에서 받아오는 전체 경로 데이터 타입
