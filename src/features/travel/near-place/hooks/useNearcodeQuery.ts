import { useQuery } from "@tanstack/react-query";
import { fetchNearbyPlaces } from "../api/fetchNearbyPlaces";
import { data } from "react-router-dom";
import type { coordinates } from "../../../../shared/types/coordinatestype";

export const useNearcodeQuery = (coords?: coordinates) => {
  return useQuery({
    queryKey: ["nearbyPlaces", coords],
    queryFn: () => fetchNearbyPlaces(coords!),
    enabled: !!coords,
  });
};
