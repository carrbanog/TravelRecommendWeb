import type { coordinates } from "../../../../shared/types/coordinatestype";
import api from "../../../../shared/api/axiosInstance";
import { AUTH_ENDPOINTS } from "../../../../shared/api/endpoints";
import type { NearPlaceApiResponse } from "../model/nearPlaceType";
import type { NearPlace } from "../../../../shared/types/nearPlaceType";
import type { NearbyPlaceParams } from "../../search-place/model/SearchType";

//좌표 받으면 주변 여행지 요청
export const fetchNearbyPlaces = async (
  { coords, type }: NearbyPlaceParams
): Promise<NearPlace[] | undefined> => {
  if (!coords) return;

  try {
    // ✅ 서버에서 반환하는 응답 형태는 { type, results } 이므로
    const res = await api.get<NearPlaceApiResponse>(
      AUTH_ENDPOINTS.NEARBYPLACES,
      {
        params: {
          lat: coords.lat,
          lng: coords.lng,
          type,
        },
      }
    );

    // ✅ res.data.results 에 실제 배열 데이터가 있음
    const { results } = res.data;

    if (Array.isArray(results)) {
      const nearPlaceData: NearPlace[] = results.map((place) => ({
        title: place.name,
        nearCoordinates: place.geometry.location,
        placeId: place.place_id,
        type: res.data.type, // ✅ 프론트에서 type도 함께 쓰고 싶을 경우
      }));

      console.log(nearPlaceData);
      return nearPlaceData;
    }
  } catch (err) {
    console.error(err);
  }
};