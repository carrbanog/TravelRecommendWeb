import {create} from "zustand"
import type { PlanCard } from '../../selected-place/model/planCardType'

type PlanCardsState = {
  planCards: PlanCard[];
  initialize: (tripDays: number) => void;
  addPlaceToDay: (dayId: number, placeTitle: string) => void;
}

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
  addPlaceToDay: (dayId, placeTitle) =>
    set((state) => ({
      planCards: state.planCards.map((card) =>
        card.id === dayId
          ? { ...card, places: [...(card.places ?? []), placeTitle] }
          : card
      ),
    })),
}));