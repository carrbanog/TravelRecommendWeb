import { useQuery } from "@tanstack/react-query";
import { fetchNearbyPlaces } from "../api/fetchNearbyPlaces";
import { data } from "react-router-dom";
import type { coordinates } from "../../../../shared/types/coordinatestype";
import type { NearbyPlaceParams } from '../../search-place/model/SearchType';

export const useNearcodeQuery = ({coords, type}: NearbyPlaceParams) => {
  console.log(coords, type)
  return useQuery({
    queryKey: ["nearbyPlaces", coords, type],
    queryFn: () => fetchNearbyPlaces({coords, type}),
    enabled: !!coords,
  });
};
