import {create} from "zustand"

type TravelPlanState = {
  startDate: Date | null;
  endDate: Date | null;
  tripDays: number;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setTripDays: (days: number) => void;
  resetPlan: () => void;
}

export const useTravelPlanStore = create<TravelPlanState>((set) => ({
  startDate: null,
  endDate: null,
  tripDays: 0,

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setTripDays: (days) => set({ tripDays: days }),

  resetPlan: () => set({ startDate: null, endDate: null, tripDays: 0 }),
}));