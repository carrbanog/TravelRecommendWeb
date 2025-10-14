import type { coordinates } from '../../../../shared/types/coordinatestype';

//api 응답 타입
export type NearPlaceApiResponse = {
  type: string;
  results: {
    name: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    place_id: string;
  }
};

