import type { NearPlaceApiResponse } from "@/entities/place/model/type";
import { AUTH_ENDPOINTS } from "@/shared/api/endpoints";
import { apiClient } from "@/shared/api/apiClient";



export const fetchNearbyPlaces = async (
  query: string,
): Promise<NearPlaceApiResponse> => {
  if (!query || !query.trim()) {
    return { location: null, places: [], hotels: [] };
  }

  try {
    const res = await apiClient.get<NearPlaceApiResponse>(
      AUTH_ENDPOINTS.NEARBYPLACES,
      {
        params: { query },
      },
    );
    console.log("서버 요청", res);
    const places = Array.isArray(res?.places) ? res.places : [];
    const hotels = Array.isArray(res?.hotels) ? res.hotels : [];
    if (!Array.isArray(res?.places) || !Array.isArray(res?.hotels)) {
      console.error(
        "🚨 서버 응답의 places 또는 hotels 포맷이 올바르지 않습니다:",
        res,
      );
    }
    return {
      location: res?.location || null,
      places,
      hotels,
    };
  } catch (error: any) {
    console.error("🚨 fetchNearbyPlaces 실행 중 에러 발생:", error);
    throw error;
  }
};
