import axios from "axios";
import type { Place } from "../model/travelTypes";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const fetchPlaceCoordinates = async (
  searchTerm: string
): Promise<Place | null> => {
  if (!searchTerm) return null;

  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchTerm
      )}.json`,
      {
        params: {
          types: "place",
          access_token: MAPBOX_TOKEN,
        },
      }
    );

    const data = response.data;
    console.log(data);
    return data.features?.[0] ?? null;
  } catch (error) {
    console.error("Mapbox API 호출 실패:", error);
    return null;
  }
};
