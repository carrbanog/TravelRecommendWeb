import { apiClient } from "@/shared/api/apiClient";
import api from "@/shared/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import type { WeatherData } from "../model/types";

const API_KEY = "88e4565f4c2b694b7c61c279feb21ecc";

// 쿼리 키를 체계적으로 관리하기 위한 객체
// 특정 도시의 날씨를 가져올 때는 weatherKeys.city("Seoul") 처럼 사용
// 모든 날씨 데이터를 가져올 때는 weatherKeys.all 처럼 사용
export const weatherKeys = {
  all: ["weather"] as const,
  city: (city: string) => [...weatherKeys.all, city] as const,
};
console.log("API_KEY:", API_KEY);

export const useWeatherQuery = (city: string) => {
  return useQuery({
    queryKey: weatherKeys.city(city),
    queryFn: () =>
      apiClient.get(
        `https://api.weatherapi.com/v1/current.json?key=88e4565f4c2b694b7c61c279feb21ecc&q=${city}&aqi=no`,
        { withCredentials: false },
      ),
    enabled: !!city,
    staleTime: 1000 * 60 * 5,
  });
};
