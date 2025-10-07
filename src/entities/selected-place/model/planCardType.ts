export type PlanPlace = {
  id: string;
  title: string;
}

export type PlanCard = {
  id:number;
  places?: PlanPlace[]
}