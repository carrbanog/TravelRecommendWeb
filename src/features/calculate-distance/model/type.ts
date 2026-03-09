export type RouteStep = {
  mode: string; // 이동 수단 (예: "WALKING", "TRANSIT", "DRIVING")
  instruction: string; // 이동 방법에 대한 설명 (예: "Walk to bus stop", "Take bus 123")
  duration: string; // 이동 시간 (예: "15 mins")
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
