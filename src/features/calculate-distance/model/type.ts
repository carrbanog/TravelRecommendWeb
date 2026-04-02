export type RouteStep = {
  mode: string; // 이동 수단 (예: "WALKING", "TRANSIT", "DRIVING")
  instruction: string; // 이동 방법에 대한 설명 (예: "Walk to bus stop", "Take bus 123")
  duration: string; // 이동 시간 (예: "15 mins")
  polyline: string; // 각 단계별 polyline 정보 (지도에 그리기 위해 필요)
};

export type distanceResponse = {
  distances: {
    fromIndex: number;
    toIndex: number;
    distanceText: string;
    durationText: string;
    mode: string;
    steps: RouteStep[];
  }[];
};
