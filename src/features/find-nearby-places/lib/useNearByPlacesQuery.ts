import { useQuery } from "@tanstack/react-query";
import { fetchNearbyPlaces } from "@/entities/place/api/placeApi";
import { toast } from "sonner";
import type { NearbyPlaceParams } from "@/entities/place/model/type";


export const useNearbyPlacesQuery = ({ query }: NearbyPlaceParams) => {
  // console.log(coords, type)
  return useQuery({
    queryKey: ["nearbyPlaces", query],
    queryFn: () => fetchNearbyPlaces(query || "",),
    enabled: !!query && !!query.trim(),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    meta: {
      onError: (error: any) => {
        console.error("🚨 주변 장소 조회 중 에러 발생:", error);

        toast.error("장소 조회 실패 ❌", {
          description:
            error.customMessage ||
            "주변 여행지를 불러오는 중 오류가 발생했습니다.",
        });
      },
    },
  });
};
