// src/entities/selected-place/ui/SelectedListCard.tsx
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { useSelectedPlacesStore } from '../model/selectedPlacesStore';

import { MdDelete } from "react-icons/md";

type SelectedPlace = Pick<NearPlace, "title" | "nearCoordinates">;

type SelectedListCardProps = {
  selectedPlaces: SelectedPlace[];
};


//SelctedList에서 선택한 정보들을 TravelPathPage에 보여주는 코드
export const SelectedListCard = ({ selectedPlaces }: SelectedListCardProps) => {
  const removePlace = useSelectedPlacesStore((s) => s.removePlace);

  return (
    <section className="flex-1 basis-[70%] overflow-y-auto p-6 border-b border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedPlaces.map((place, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-slate-100 to-slate-200 shadow-lg rounded-2xl shadow-sm hover:shadow-md p-4 transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <button className="text-gray-400 hover:text-red-500 transition" onClick={() => removePlace(place)}><MdDelete /></button>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 truncate">{place.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
