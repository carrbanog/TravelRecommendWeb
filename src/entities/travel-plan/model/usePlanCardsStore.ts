import { create } from "zustand";
import type {
  PlanCard,
  PlanPlace,
} from "../../selected-place/model/planCardType";

type PlanCardsState = {
  planCards: PlanCard[];
  initialize: (tripDays: number) => void;
  addPlaceToDay: (dayId: number, place: PlanPlace) => void;
  removePlaceToDay: (dayId: number, place: PlanPlace) => void;
};

export const usePlanCardsStore = create<PlanCardsState>((set) => ({
  planCards: [],

  // 여행일 수만큼 Day 카드 초기화
  initialize: (tripDays) =>
    set({
      planCards: Array.from({ length: tripDays }, (_, i) => ({
        id: i + 1,
        places: [],
      })),
    }),

  // 특정 Day 카드에 장소 추가
  addPlaceToDay: (dayId, place) =>
    set((state) => ({
      planCards: state.planCards.map((card) =>
        card.id === dayId
          ? { ...card, places: [...(card.places ?? []), place] }
          : card
      ),
    })),

  removePlaceToDay: (dayId, place) =>
    set((state) => ({
      planCards: state.planCards.map((card) =>
        card.id === dayId
          ? { ...card, places: card.places?.filter((p) => p.id !== place.id) }
          : card
      ),
    })),
}));
