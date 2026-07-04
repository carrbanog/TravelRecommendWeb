import type { coordinates } from "./coordinatestype";

export type PhotoInfo = {
  height: number;
  width: number;
  html_attributions: string[];
  photo_reference: string;
};

export type NearPlace = {
  title: string;
  nearCoordinates: coordinates;
  placeId: string;
  type: string;
  // photos?: PhotoInfo[];
};
// 선택한 여행지를 근처 여행지와 동일한 타입으로 정의하여 일관성을 유지
export type SelectedPlace = NearPlace;