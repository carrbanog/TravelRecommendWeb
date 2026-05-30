import axios from "axios";
import type { AddressType } from "../model/type";
import type { NearbyPlaceParams } from "../model/type";
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import type { NearPlaceApiResponse } from "../model/type";
import { AUTH_ENDPOINTS } from "../../../shared/api/endpoints";
import { apiClient } from "../../../shared/api/apiClient";
import { handleApiError } from '../../../shared/api/apiClient';

// 도시이름, 좌표 반환
export const fetchMapCode = async (
  address: string,
): Promise<AddressType | undefined> => {

  if(!address || !address.trim()) {
    throw new Error("검색할 주소가 입력되지 않았습니다.");
  }

  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: import.meta.env.VITE_GOOGLE_MAP,
        },
      },
    );
    const {status, results} = res.data;

    if(status === "ZERO_RESULTS" || !results || results.length === 0) {
      throw new Error("검색 결과가 존재하지 않습니다. 정확한 주소를 입력해주세요.");
    }

    return results[0];
  } catch (error: any) {
    console.error("🚨 fetchMapCode 실행 중 에러 발생:", error);
    return handleApiError(error);
  }
};

// 좌표를 가지고 주변 장소 반환
export const fetchNearbyPlaces = async ({
  coords,
  type,
}: NearbyPlaceParams): Promise<NearPlace[]> => {
  if (!coords || !coords.lat || !coords.lng) {
    console.warn("⚠️ 위치 정보(좌표)가 누락되어 요청을 중단합니다.");
    return []; 
  }

  try {
    const res = await apiClient.get<NearPlaceApiResponse>(
      AUTH_ENDPOINTS.NEARBYPLACES,
      {
        params: {
          lat: coords.lat,
          lng: coords.lng,
          type,
        },
      },
    );

    const { results } = res;
    console.log("results in fetchNearbyPlaces", results);

    // 2. 서버가 준 데이터 구조가 올바른지 검증 (런타임 타입 에러 방어)
    if (!results || !Array.isArray(results)) {
      console.error("🚨 서버 응답의 results 포맷이 올바르지 않습니다:", results);
      return []; 
    }

    const nearPlaceData: NearPlace[] = results.map((place) => ({
      title: place.name || "이름 없는 장소",
      nearCoordinates: place.geometry?.location || { lat: 0, lng: 0 },
      placeId: place.place_id || `unknown-${Math.random()}`,
      type: res.type || type, 
    }));

    return nearPlaceData;

  } catch (error: any) {
    console.error("🚨 fetchNearbyPlaces 실행 중 에러 발생:", error);
    throw error; 
  }
};

// export const fetchNearbyPlaces = async (
//   { coords, type }: NearbyPlaceParams
// ): Promise<NearPlace[] | undefined> => {
//   if (!coords) return;

//   try {
//     // ✅ 서버에서 반환하는 응답 형태는 { type, results } 이므로
//     const res = await api.get<NearPlaceApiResponse>(
//       AUTH_ENDPOINTS.NEARBYPLACES,
//       {
//         params: {
//           lat: coords.lat,
//           lng: coords.lng,
//           type,
//         },
//       }
//     );

//     // ✅ res.data.results 에 실제 배열 데이터가 있음
//     const { results } = res.data;
//     // console.log(results)
//     if (Array.isArray(results)) {
//       const nearPlaceData: NearPlace[] = results.map((place) => ({
//         title: place.name,
//         nearCoordinates: place.geometry.location,
//         placeId: place.place_id,
//         type: res.data.type, // ✅ 프론트에서 type도 함께 쓰고 싶을 경우
//       }));

//       // console.log(nearPlaceData);
//       return nearPlaceData;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };
