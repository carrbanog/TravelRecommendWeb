import { useQuery } from "@tanstack/react-query";
import { fetchMapCode } from "../../../entities/place/api/placeApi";
import { toast } from "sonner";

export const useGeocodeQuery = (placeSearch: string) => {
  return useQuery({
    queryKey: ["geocode", placeSearch],
    queryFn: () => fetchMapCode(placeSearch),
    enabled: !!placeSearch, //빈 문자열이면 api 호출 막음
    // select: (data) => data?.geometry.location, 
    //원본 데이터를 원하는 형태로 가공
    retry: false, // 지역을 검색할 때는 실패 시 재시도하지 않도록 설정(너무 오래 걸림)
    meta: {
      onError: (error: any) => {
        console.error("🚨 장소 검색 중 에러 발생:", error);
        toast.error("장소 검색 실패 ❌", {
          description:
            error.customMessage ||
            "장소를 검색하는 중 오류가 발생했습니다.",
        });
      },
    },
  });
};
