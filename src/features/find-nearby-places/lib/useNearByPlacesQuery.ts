import { useQuery } from "@tanstack/react-query";
import { fetchNearbyPlaces } from "../../../entities/place/api/placeApi"
import { toast } from "sonner"
import type { NearbyPlaceParams } from "../../../entities/place/model/type"

export const useNearcodeQuery = ({coords, type}: NearbyPlaceParams) => {
  // console.log(coords, type)
  return useQuery({
    queryKey: ["nearbyPlaces", coords, type],
    queryFn: () => fetchNearbyPlaces({coords, type}),
    enabled: !!coords,
    meta:{
      onError: (error:any) => {
        console.error("🚨 주변 장소 조회 중 에러 발생:", error);

        toast.error("장소 조회 실패 ❌", {
          description: error.customMessage || "주변 여행지를 불러오는 중 오류가 발생했습니다.",
        });
      }
    }
  });
};
