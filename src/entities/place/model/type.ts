import type { coordinates } from '@/shared/types/coordinatestype';
import type { NearPlace } from '@/shared/types/nearPlaceType';

//SearchForm에서 입력값을 여행지, 호텔 중에서 선택
export type SearchType = "place" | "hotel"

//fetchMapCode에서 api 요청시 받을 데이터의 타입
export type AddressType = {
  formatted_address: string;
  geometry: {
    location: coordinates;
  };
  place_id: string;
};

// 서버에서 반환되는 근처 여행지 데이터의 타입 정의
export type NearPlaceApiResponse = {
  location: coordinates | null;
  places: NearPlace[];
  hotels: NearPlace[];
}

// 뒤로가기 시 검색어를 기억하기 위해 상태에 저장할 타입 정의
export type PlaceSearchResult = {
  location: coordinates | null;
  places: NearPlace[];
  hotels: NearPlace[];
}; 

export type NearbyPlaceParams = {
  query?: string;
  coords?: coordinates;
}


//TravelPage에서 placeSearch가 받을 타입(query: 입력한 지역, type: 선택한 목적지)
export type SearchParams = {
  query: string;
  type?: SearchType;
}


// 
export type PlanPlace = {
  id: string;
  title: string;
  nearCoordinates: coordinates
}

//날짜별 여행지 정보
export type PlanCard = {
  id:number;
  places?: PlanPlace[]
}