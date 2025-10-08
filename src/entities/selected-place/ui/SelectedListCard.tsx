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
    <section
      className="overflow-y-auto p-6 border-b border-gray-200"
      style={{
        flexBasis: "70%",
        height: "100%", // ✅ 명시적으로 높이 부여
        maxHeight: "80vh", // ✅ 또는 명시적 제한
        overscrollBehavior: "contain", // ✅ 드래그 중 부모 스크롤 방지
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
