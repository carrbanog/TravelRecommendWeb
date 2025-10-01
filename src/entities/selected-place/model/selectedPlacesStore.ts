import { create } from 'zustand';
import type { NearPlace } from '../../../shared/types/nearPlaceType';

type SelectedPlacesState = {
  selectedPlaces: NearPlace[];
  addPlace: (place: NearPlace) => void;
  removePlace: (title: string) => void;
  clear: () => void;
}


export const useSelectedPlacesStore = create<SelectedPlacesState>((set) => ({
  selectedPlaces: [],
  addPlace: (place) => 
    set((state) => {
      if(state.selectedPlaces.find((p) => p.title === place.title)){
        return state;
      }
      // console.log(selectedPlaces)
      return {selectedPlaces : [...state.selectedPlaces, place]}
    }),
  removePlace: (title) =>
    set((state) => ({
      selectedPlaces: state.selectedPlaces.filter((p) => p.title !== title),
    })),

  clear: () => set({selectedPlaces: []})
}))