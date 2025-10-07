// src/pages/travel/TravelPathPage.tsx
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from "react";
import type { PlanCard } from "../../../entities/selected-place/model/planCardType";
import { SelectedListCard } from "../../../entities/selected-place/ui/SelectedListCard";
import { PlanCardList } from "../../../entities/selected-place/ui/PlanCardList";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import { useTravelPlanStore } from "../../../entities/travel-plan/model/useTravelPlanStore";
import { useNavigate } from "react-router-dom";
import { usePlanCardsStore } from '../../../entities/travel-plan/model/usePlanCardsStore';

const TravelPathPage = () => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const setCenter = useSelectedPlacesStore((s) => s.setCenter);
  const tripDays = useTravelPlanStore((s) => s.tripDays);
  const {planCards, initialize, addPlaceToDay} = usePlanCardsStore();

  const navigate = useNavigate();

  useEffect(() => {
    initialize(tripDays);
  }, [])
  console.log(planCards)

  // 지도 중심값 / 새로고침 시 이동 처리
  useEffect(() => {
    if (selectedPlaces.length > 0) {
      setCenter(selectedPlaces[0].nearCoordinates);
    } else {
      navigate("/travel", { replace: true });
    }
  }, [selectedPlaces, setCenter, navigate]);

  // dnd-kit 센서 (PointerSensor 사용)
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    // draggable에서 보낸 데이터 (DraggableListCard의 data.place)
    const draggedPlace = active.data.current?.place;

    // 사용중인 PlanCard 타입은 places: string[] 이므로, title(문자열)로 저장
    const placeTitle =
      typeof draggedPlace === "string"
        ? draggedPlace
        : draggedPlace?.title ?? String(draggedPlace);

    const overId = String(over.id);
    if (overId.startsWith("day-")) {
      const dayId = Number(overId.split("-")[1]);
      addPlaceToDay(dayId, placeTitle)
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-[80%] h-[85%] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
          <SelectedListCard selectedPlaces={selectedPlaces} />
          {/* planCards와 setPlanCards를 prop으로 전달 */}
          <PlanCardList />
        </div>
      </div>
    </DndContext>
  );
};

export default TravelPathPage;
