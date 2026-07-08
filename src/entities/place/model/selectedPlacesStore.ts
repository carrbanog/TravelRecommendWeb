import { create } from "zustand";
import type { NearPlace } from "@/shared/types/nearPlaceType";
import type { coordinates } from "@/shared/types/coordinatestype";

type SelectedPlacesState = {
  selectedPlaces: NearPlace[];
  selectedHotels: NearPlace[];
  lastCoords?: coordinates;
  center: coordinates;
  addPlace: (place: NearPlace) => void;
  removePlace: (place: string) => void;
  addHotel: (hotel: NearPlace) => void;
  removeHotel: (placeId: string) => void;
  setLastCoords: (coords: coordinates) => void;
  setCenter: (coords: coordinates) => void;
};

export const useSelectedPlacesStore = create<SelectedPlacesState>((set) => ({
  selectedPlaces: [],
  selectedHotels: [],
  lastCoords: undefined,
  center: { lat: 37.5665, lng: 126.989 }, //지도 위치 중간값
  addPlace: (place) =>
    set((state) => {
      if (state.selectedPlaces.find((p) => p.title === place.title)) {
        return state;
      }
      // console.log(selectedPlaces)
      return { selectedPlaces: [...state.selectedPlaces, place] };
    }),
  removePlace: (place) =>
    set((state) => ({
      selectedPlaces: state.selectedPlaces.filter((p) => p.placeId !== place),
    })),

  addHotel: (hotel) =>
    set((state) => {
      if (state.selectedHotels.find((h) => h.title === hotel.title))
        return state;
      return { selectedHotels: [...state.selectedHotels, hotel] };
    }),
  removeHotel: (placeId) =>
    set((state) => ({
      selectedHotels: state.selectedHotels.filter((h) => h.placeId !== placeId),
    })),

  setLastCoords: (coords) => set({ lastCoords: coords }),
  setCenter: (coords) => set({ center: coords }),
}));
