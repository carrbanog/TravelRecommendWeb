// src/entities/selected-place/ui/SelectedListCard.tsx
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { useSelectedPlacesStore } from "../model/selectedPlacesStore";

import { DraggableListCard } from "./DraggableListCard";

type SelectedPlace = Pick<NearPlace, "title" | "nearCoordinates" | "placeId">;

type SelectedListCardProps = {
  selectedPlaces: SelectedPlace[];
};

//SelctedList에서 선택한 정보들을 TravelPathPage에 보여주는 코드
export const SelectedListCard = ({ selectedPlaces }: SelectedListCardProps) => {
  const removePlace = useSelectedPlacesStore((s) => s.removePlace);


  return (
    <section
      className="overflow-y-auto p-4 border-b border-gray-200"
      style={{
        flexBasis: "70%",
        height: "100%",
        maxHeight: "80vh",
        overscrollBehavior: "contain",
      }}
    >
      {/* ✅ 한 줄에 최대 5개 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {selectedPlaces.map((place) => (
          <DraggableListCard
            key={place.placeId}
            place={place}
            onRemove={removePlace}
          />
        ))}
      </div>
    </section>
  );
};
