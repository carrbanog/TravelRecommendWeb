import type { coordinates } from '../../../../shared/types/coordinatestype';

export type SearchType = "place" | "hotel"

export type SearchParams = {
  query: string;
  type: SearchType;
}

export type NearbyPlaceParams = {
  coords?: coordinates;
  type: SearchType;
}