import axios from "axios";
import type { AddressType } from "../model/type"
import type { NearbyPlaceParams } from "../model/type"
import type { NearPlace } from '../../../shared/types/nearPlaceType';
import type { NearPlaceApiResponse } from "../model/type"
import { AUTH_ENDPOINTS } from '../../../shared/api/endpoints';
import api from '../../../shared/api/axiosInstance';

// 도시이름, 좌표 반환
export const fetchMapCode = async (
  address: string
): Promise<AddressType | undefined> => {
  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: import.meta.env.VITE_GOOGLE_MAP,
        },
      }
    );
    // console.log(res.data.results[0]);
    // console.log("test");
    return res.data.results[0];
    // if(res.data.)
  } catch (err) {
    console.error(err);
  }
};

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
    // console.log(results)
    if (Array.isArray(results)) {
      const nearPlaceData: NearPlace[] = results.map((place) => ({
        title: place.name,
        nearCoordinates: place.geometry.location,
        placeId: place.place_id,
        type: res.data.type, // ✅ 프론트에서 type도 함께 쓰고 싶을 경우
      }));

      // console.log(nearPlaceData);
      return nearPlaceData;
    }
  } catch (err) {
    console.error(err);
  }
};
