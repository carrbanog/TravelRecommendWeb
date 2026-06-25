// 구글 플레이스 API의 개별 장소(Place) 원본 구조
export interface GooglePlaceObject {
  name?: string;
  place_id?: string;
  geometry?: {
    location: {
      lat: number;
      lng: number;
    };
  };
  [key: string]: any; 
}