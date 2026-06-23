import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay, // 필수 추가
} from "@dnd-kit/core";
import { useSelectedPlacesStore } from "../../../entities/place/model/selectedPlacesStore";
import { SelectedListCard } from "../../../entities/place/ui/SelectedListCard";
import { PlanCardList } from "../../../entities/travel-plan/ui/PlanCardList";
import { handleDragEnd } from "../../../features/plan-itinerary-route/lib/handleDragEnd";
import { ListCardUI } from "../../../entities/place/ui/DraggableListCard"; // UI 컴포넌트 임포트

interface TravelPlannerWidgetProps {
  onShowPathClick: () => void;
}

export const TravelPlannerWidget = ({
  onShowPathClick,
}: TravelPlannerWidgetProps) => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const removePlace = useSelectedPlacesStore((s) => s.removePlace);
  const sensors = useSensors(useSensor(PointerSensor));

  // 🔹 드래그 중인 아이템 상태 관리 (Overlay용)
  const [activeId, setActiveId] = useState<string | null>(null);
  const activePlace = selectedPlaces.find((p) => p.placeId === activeId);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEndInternal = (event: any) => {
    handleDragEnd(event);
    setActiveId(null);
  };

  return (
    // 전체 배경 높이 고정 (h-screen 기반)
    <div className="w-full bg-slate-50 p-6 flex justify-center items-start overflow-hidden">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEndInternal}
        autoScroll={false}
      >
        <div className="w-[85%] max-w-7xl h-full bg-white rounded-[1rem] shadow-2xl border border-slate-200 flex flex-col overflow-hidden relative transition-all">
          {/* 1. 선택 리스트 영역 (비중 확대) 
              min-h-0을 사용하여 내부 자식이 스크롤을 가질 수 있게 함 */}
          <div className="flex-[1.2] min-h-0 flex flex-col border-b border-slate-100">
            <SelectedListCard selectedPlaces={selectedPlaces} onRemovePlace={removePlace} />
          </div>

          {/* 2. PlanCardList 영역 (가로 스크롤 영역)
              비율을 flex-1 정도로 유지하여 카드가 찌그러지지 않게 공간 확보 */}
          <div className="flex-1 min-h-0 flex flex-col bg-slate-50/30 overflow-hidden">
            <PlanCardList />
          </div>

          {/* 3. 하단 컨트롤바 */}
          <footer className="flex-none flex justify-center py-5 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-20">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={onShowPathClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-3.5 rounded-full shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              동선 보기
            </button>
          </footer>
        </div>

        {/* 🔹 DragOverlay: 영역 밖 이동을 가능하게 하는 핵심 */}
        {/* ui컴포넌트가 아닌 카드를 집어 올렸을 때 화면에 보여주는 껍데기 역할 */}
        <DragOverlay zIndex={1000}>
          {activeId && activePlace ? (
            // 🔹 여기서 DraggableListCard(로직 포함) 대신 ListCardUI(UI만) 사용
            <div className="w-48 transform scale-105 rotate-3 opacity-90 shadow-2xl">
              <ListCardUI
                place={activePlace}
                onRemove={() => {}}
                isDragging={false} // 오버레이는 그 자체가 드래그 중인 모습이므로 false 처리
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
