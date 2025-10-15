import type { coordinates } from '../../../shared/types/coordinatestype';


//fetchMapCode에서 api 요청시 받을 데이터의 타입
export type AddressType = {
  formatted_address: string;
  geometry: {
    location: coordinates;
  };
  place_id: string;
};

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

export type NearbyPlaceParams = {
  coords?: coordinates;
  type: SearchType;
}

//SearchForm에서 입력값을 여행지, 호텔 중에서 선택
export type SearchType = "place" | "hotel"

//TravelPage에서 placeSearch가 받을 타입(query: 입력한 지역, type: 선택한 목적지)
export type SearchParams = {
  query: string;
  type: SearchType;
}



