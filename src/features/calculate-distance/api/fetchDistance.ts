import { apiClient } from "@/shared/api/apiClient";
import type { coordinates } from '@/shared/types/coordinatestype';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export const useFetchDistanceQuery = (locations: coordinates[]) => {
  return useQuery({
    queryKey: ["distance", locations],
    queryFn: () => fetchDistance(locations),
    enabled: locations && locations.length >= 2, // 위치 데이터가 있을 때만 쿼리 실행
  });
};

export const fetchDistance = async (locations: coordinates[]) => {
  const res = await axios.post("http://localhost:5000/calculate-distance", {locations});
  return res;
};