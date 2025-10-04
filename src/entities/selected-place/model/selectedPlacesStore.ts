import { create } from 'zustand';
import type { NearPlace } from '../../../shared/types/nearPlaceType';
import type { coordinates } from '../../../shared/types/coordinatestype';

type SelectedPlacesState = {
  selectedPlaces: NearPlace[];
  lastCoords?: coordinates;
  center: coordinates
  setLastCoords: (coords: coordinates) => void;
  addPlace: (place: NearPlace) => void;
  removePlace: (place: NearPlace) => void;
  setCenter: (coords: coordinates) => void;
}


export const useSelectedPlacesStore = create<SelectedPlacesState>((set) => ({
  selectedPlaces: [],
  lastCoords: undefined,
  center: { lat: 37.5665, lng: 126.989 }, //지도 위치 중간값
  addPlace: (place) => 
    set((state) => {
      if(state.selectedPlaces.find((p) => p.title === place.title)){
        return state;
      }
      // console.log(selectedPlaces)
      return {selectedPlaces : [...state.selectedPlaces, place]}
    }),
  removePlace: (place) =>
    set((state) => ({
      selectedPlaces: state.selectedPlaces.filter((p) => p.title !== place.title),
    })),
  setLastCoords: (coords) => set({lastCoords: coords}),
  setCenter: (coords) => set({center:coords})
}))