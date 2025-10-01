import type { coordinates } from "../../../../shared/types/coordinatestype";
import api from "../../../../shared/api/axiosInstance";
import { AUTH_ENDPOINTS } from "../../../../shared/api/endpoints";
import type { NearPlaceApiResponse } from "../model/nearPlaceType";
import type { NearPlace } from "../../../../shared/types/nearPlaceType";

//좌표 받으면 주변 여행지 요청
export const fetchNearbyPlaces = async (
  query: coordinates
): Promise<NearPlace[] | undefined> => {
  try {
    const res = await api.get<NearPlaceApiResponse[]>(
      AUTH_ENDPOINTS.NEARBYPLACES,
      {
        params: {
          lat: query.lat,
          lng: query.lng,
        },
      }
    );
    if (Array.isArray(res.data)) {
      const nearPlaceData: NearPlace[] = res.data.map((nearPlace) => ({
        title: nearPlace.name,
        nearCoordinates: nearPlace.geometry.location,
      }));
      // console.log(nearPlaceData);
      // console.log(res.data[0].photos);
      return nearPlaceData;
    }
    // console.log(res.data.map((e) => console.log(e.geometry.location)));
  } catch (err) {
    console.error(err);
  }
};
