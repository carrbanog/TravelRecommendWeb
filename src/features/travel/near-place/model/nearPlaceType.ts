import type { coordinates } from '../../../../shared/types/coordinatestype';

//api 응답 타입
export type NearPlaceApiResponse = {
  name: string;
  geometry: {
    location: coordinates;
  };
  rating: number;
  place_id:string;
};

