import { useQuery } from "@tanstack/react-query";
import { getPlaceDetails } from "../api/getPlaceDetails";

export const usePlaceDetailsQuery = (placeId?: string | null) => {
  return useQuery({
    queryKey: ["placeDetails", placeId],
    queryFn: () => (placeId ? getPlaceDetails(placeId!) : null),
    enabled: !!placeId,
    staleTime: 1000 * 60 * 5,
  });
};
