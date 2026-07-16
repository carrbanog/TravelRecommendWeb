import { useQuery } from "@tanstack/react-query";
import { fetchMapCode } from "@/entities/place/api/placeApi";
import { toast } from "sonner";

export const useGeocodeQuery = (placeSearch: string) => {
  return useQuery({
    queryKey: ["geocode", placeSearch],
    queryFn: () => fetchMapCode(placeSearch),
    enabled: !!placeSearch,
    retry: false, 
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
