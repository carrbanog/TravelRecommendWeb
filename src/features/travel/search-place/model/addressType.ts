import type { coordinates } from "../../../../shared/types/coordinatestype";

export type AddressType = {
  formatted_address: string;
  geometry: {
    location: coordinates;
  };
  place_id: string;
};
