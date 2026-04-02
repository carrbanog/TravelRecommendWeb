import { useState, useEffect } from "react";

// Directions API를 사용하여 각 여행 계획 카드의 도로 경로 좌표를 계산하는 커스텀 훅
// 직선 거리가 아닌 실제 도로 경로를 계산하여 지도에 표시할 수 있도록 함
export const useRouteDirections = (planCards: any[]) => {
  const [roadPaths, setRoadPaths] = useState<{ [key: string]: google.maps.LatLngLiteral[] }>({});

  useEffect(() => {
    if (!window.google || planCards.length === 0) return;

    const directionsService = new google.maps.DirectionsService();

    planCards.forEach((card) => {
      if (!card.places || card.places.length < 2) return;

      directionsService.route(
        {
          origin: card.places[0].nearCoordinates,
          destination: card.places[card.places.length - 1].nearCoordinates,
          waypoints: card.places.slice(1, -1).map((p: any) => ({
            location: p.nearCoordinates,
            stopover: true,
          })),
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            const path = result.routes[0].overview_path.map((p) => ({
              lat: p.lat(),
              lng: p.lng(),
            }));
            setRoadPaths((prev) => ({ ...prev, [card.id]: path }));
          }
        }
      );
    });
  }, [planCards]);

  return { roadPaths };
};