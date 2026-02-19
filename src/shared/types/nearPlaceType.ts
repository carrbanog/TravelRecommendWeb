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
  photos?: PhotoInfo[];
};
