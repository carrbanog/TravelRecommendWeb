import type { coordinates } from "../../../../shared/types/coordinatestype";
import api from "../../../../shared/api/axiosInstance";
import { AUTH_ENDPOINTS } from "../../../../shared/api/endpoints";
import axios from "axios";

export const fetchNearbyPlaces = async (query: coordinates) => {
  console.log("근처 좌표 요청", query.lat, query.lng);
  try {
    const res = await axios.get("http://localhost:5000/nearbyplaces", {
      params: {
        lat: query.lat,
        lng: query.lng,
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
