import { useQuery } from "@tanstack/react-query";
import { fetchMapCode } from "../api/fetchMapCode";

export const useGeocodeQuery = (placeSearch: string) => {
  return useQuery({
    queryKey: ["geocode", placeSearch],
    queryFn: () => fetchMapCode(placeSearch),
    enabled: !!placeSearch, //빈 문자열이면 api 호출 막음
    select: (data) => data?.geometry.location, //원본 데이터를 원하는 형태로 가공
  });
};
