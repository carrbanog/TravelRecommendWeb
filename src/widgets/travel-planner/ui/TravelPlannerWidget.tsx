import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSelectedPlacesStore } from "../../../entities/place/model/selectedPlacesStore"
import { SelectedListCard } from "../../../entities/place/ui/SelectedListCard";
import { PlanCardList } from "../../../entities/selected-place/ui/PlanCardList";
import { handleDragEnd } from "../../../features/plan-itinerary-route/lib/handleDragEnd";

interface TravelPlannerWidgetProps {
  onShowPathClick: () => void;
}

export const TravelPlannerWidget = ({
  onShowPathClick,
}: TravelPlannerWidgetProps) => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const sensors = useSensors(useSensor(PointerSensor)); // Mouse sensor for DnD

  return (
<div className="flex flex-col items-center h-full bg-gray-100">
  <DndContext
    sensors={sensors}
    onDragEnd={handleDragEnd}
    autoScroll={false}
  >
    <div className="w-[80%] h-[98%] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden relative">
      {/* 선택 리스트 영역 (조금만 확대) */}
      <div className="flex-[0.65] overflow-y-auto border-b border-gray-200">
        <SelectedListCard selectedPlaces={selectedPlaces} />
      </div>

      {/* PlanCardList 영역 (조금만 축소) */}
      <div className="flex-[0.5] flex flex-col border-t border-gray-100 overflow-hidden">
        <PlanCardList />
      </div>
            <div className="flex justify-center py-2 bg-gray-50 border-t border-b border-gray-100">
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onShowPathClick}
          className="bg-blue-500 text-white rounded-lg px-4 py-1.5"
        >
          동선 보기
        </button>
      </div>
    </div>
  </DndContext>
</div>
  );
};
