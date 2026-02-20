import { useQuery } from "@tanstack/react-query";
import { getPlaceDetails } from "../api/getPlaceDetails";

export const usePlaceDetailsQuery = (placeId: string | null) => {
  return useQuery({
    queryKey: ["placeDetails", placeId],
    queryFn: () => (placeId ? getPlaceDetails(placeId) : null),
    enabled: !!placeId, // placeId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5, // 5분간 데이터를 신선한 상태로 유지 (캐싱)
  });
};