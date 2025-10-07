// src/entities/selected-place/ui/SelectedListCard.tsx
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { useSelectedPlacesStore } from "../model/selectedPlacesStore";

import { DraggableListCard } from "../ui/DraggableListCard";

type SelectedPlace = Pick<NearPlace, "title" | "nearCoordinates" | "placeId">;

type SelectedListCardProps = {
  selectedPlaces: SelectedPlace[];
};

//SelctedList에서 선택한 정보들을 TravelPathPage에 보여주는 코드
export const SelectedListCard = ({ selectedPlaces }: SelectedListCardProps) => {
  const removePlace = useSelectedPlacesStore((s) => s.removePlace);

  return (
    <section className="flex-1 basis-[70%] overflow-y-auto p-6 border-b border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedPlaces.map((place) => (
          <DraggableListCard
            key={place.placeId} // key는 고유해야 합니다. contentid가 가장 적절합니다.
            place={place}
            onRemove={removePlace} // zustand 스토어의 removePlace 함수를 prop으로 전달합니다.
          />
        ))}
      </div>
    </section>
  );
};
