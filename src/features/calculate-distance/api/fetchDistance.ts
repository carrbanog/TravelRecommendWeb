import { apiClient } from "@/shared/api/apiClient";
import type { coordinates } from "@/shared/types/coordinatestype";
import { useQuery } from "@tanstack/react-query";
import type { distanceResponse } from "../model/type";

export const useFetchDistanceQuery = (locations: coordinates[]) => {
  return useQuery({
    queryKey: ["distance", locations],
    queryFn: () => fetchDistance(locations),
    enabled: locations && locations.length >= 2, // 위치 데이터가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분 동안은 데이터가 '신선(fresh)'하다고 판단하여 서버에 재요청하지 않고 캐시를 씁니다.
    gcTime: 10 * 60 * 1000,
  });
};

export const fetchDistance = async (
  locations: coordinates[],
): Promise<distanceResponse> => {
  const res = await apiClient.post<
    { locations: coordinates[] },
    distanceResponse
  >("/calculate-distance", { locations });

  return res;
};
