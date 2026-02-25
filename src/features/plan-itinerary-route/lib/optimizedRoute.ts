// 경로를 최적화 해서 반환하는 함수
// Google Maps API가 로드된 환경에서 실행되어야 합니다.
export const getOptimizedRoute = (places: any[]): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (places.length <= 2) {
      resolve(places); // 장소가 2개 이하면 최적화가 의미 없음
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    // 1. 출발지, 목적지, 경유지 설정
    const origin = places[0].nearCoordinates;
    const destination = places[places.length - 1].nearCoordinates;
    const waypoints = places.slice(1, -1).map((p) => ({
      location: p.nearCoordinates,
      stopover: true,
    }));

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        optimizeWaypoints: true, // 핵심: Google이 순서를 재계산함
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          // 2. Google이 반환한 최적 순서(waypoint_order) 추출
          // 예: [1, 0] -> 원래 index 2번이 먼저, 그 다음 1번 순서라는 뜻
          const optimizedOrder = result.routes[0].waypoint_order;

          const middlePlaces = places.slice(1, -1);
          const rearrangedMiddle = optimizedOrder.map(
            (idx) => middlePlaces[idx],
          );

          // 3. [출발지, ...정렬된경유지, 목적지] 합치기
          resolve([places[0], ...rearrangedMiddle, places[places.length - 1]]);
        } else {
          reject(status);
        }
      },
    );
  });
};
