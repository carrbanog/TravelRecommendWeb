// src/features/travel/lib/handleDragEnd.ts
import type { DragEndEvent } from "@dnd-kit/core";
import { usePlanCardsStore } from "../../../entities/travel-plan/model/usePlanCardsStore"

export const handleDragEnd = (event: DragEndEvent) => {
  const { over, active } = event;
  if (!over) return;

  const draggedPlace = active.data.current?.place;
  console.log(draggedPlace)
  const placeObj = {
    id: draggedPlace?.placeId ?? String(draggedPlace),
    title: draggedPlace?.title ?? String(draggedPlace),
    nearCoordinates: draggedPlace?.nearCoordinates ?? String(draggedPlace)
  };

  const overId = String(over.id);
  if (overId.startsWith("day-")) {
    const dayId = Number(overId.split("-")[1]);
    const { addPlaceToDay } = usePlanCardsStore.getState();
    addPlaceToDay(dayId, placeObj);
  }
};
