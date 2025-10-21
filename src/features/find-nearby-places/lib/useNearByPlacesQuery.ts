import { useQuery } from "@tanstack/react-query";
import { fetchNearbyPlaces } from "../../../entities/place/api/placeApi"
import { data } from "react-router-dom";
import type { coordinates } from "../../../shared/types/coordinatestype";
import type { NearbyPlaceParams } from "../../../entities/place/model/type"

export const useNearcodeQuery = ({coords, type}: NearbyPlaceParams) => {
  // console.log(coords, type)
  return useQuery({
    queryKey: ["nearbyPlaces", coords, type],
    queryFn: () => fetchNearbyPlaces({coords, type}),
    enabled: !!coords,
  });
};
