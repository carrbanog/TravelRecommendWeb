import { apiClient } from "@/shared/api/apiClient";
import api from "@/shared/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import type { WeatherData } from "../model/types";

const API_KEY = "9433759d5fe232be55c300dfaf2fc330";

// 쿼리 키를 체계적으로 관리하기 위한 객체
// 특정 도시의 날씨를 가져올 때는 weatherKeys.city("Seoul") 처럼 사용
// 모든 날씨 데이터를 가져올 때는 weatherKeys.all 처럼 사용
export const weatherKeys = {
  all: ["weather"] as const,
  city: (city: string) => [...weatherKeys.all, city] as const,
};

export const useWeatherQuery = (city: string) => {
  // useQuery<반환할 데이터 타입, 에러 타입>
  return useQuery<WeatherData, Error>({
    queryKey: weatherKeys.city(city),
    queryFn: () =>
      apiClient.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
        { withCredentials: false }
      ),
    enabled: !!city,
    staleTime: 1000 * 60 * 5,
  });
};