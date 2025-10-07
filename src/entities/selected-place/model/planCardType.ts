import type { coordinates } from '../../../shared/types/coordinatestype';

export type PlanPlace = {
  id: string;
  title: string;
  nearCoordinates: coordinates
}

export type PlanCard = {
  id:number;
  places?: PlanPlace[]
}