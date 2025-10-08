import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import { SelectedListCard } from "../../../entities/selected-place/ui/SelectedListCard";
import { PlanCardList } from "../../../entities/selected-place/ui/PlanCardList";
import { handleDragEnd } from "../../../features/travel/travel-path/lib/handleDragEnd";

interface TravelPlannerWidgetProps {
  onShowPathClick: () => void;
}

export const TravelPlannerWidget = ({ onShowPathClick }: TravelPlannerWidgetProps) => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const sensors = useSensors(useSensor(PointerSensor)); // Mouse sensor for DnD

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} autoScroll={false}>
      <div className="flex justify-center items-center h-full bg-gray-100">
        <div className="w-[80%] h-[85%] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
          <SelectedListCard selectedPlaces={selectedPlaces} />
          <PlanCardList />
          <button
            onPointerDown={(e) => e.stopPropagation()} // Prevents DnD from starting on button click
            onClick={onShowPathClick}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4 self-center"
          >
            동선 보기
          </button>
        </div>
      </div>
    </DndContext>
  );
};