import axios from "axios";
import type { AddressType, coordinates } from "../model/addressType";

export const fetchNearbyPlaces = async (query: coordinates) => {
  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${query.lat}, ${query.lng}`,
          radius: 5000,
          key: import.meta.env.VITE_GOOGLE_MAP,
        },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
