import React, { memo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { Trash2, GripVertical, MapPin } from "lucide-react";
import { useSelectedPlacesStore } from "../model/selectedPlacesStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SelectedPlace = Pick<NearPlace, "title" | "nearCoordinates" | "placeId">;

type DraggableListCardProps = {
  place: SelectedPlace;
  onRemove: (place: string) => void;
};

// DraggableListCard.tsx

// 1. 순수하게 UI만 담당하는 컴포넌트 (memo 적용)
export const ListCardUI = memo(({ place, onRemove, isDragging, style, listeners, attributes, setNodeRef }: any) => {
  // 드래그 중이 아닐 때만 로그를 찍어서 확인
  if (!isDragging) console.log(`ListCardUI 렌더링: ${place.title}`);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "group relative flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-3 shadow-sm transition-all cursor-grab active:cursor-grabbing",
        "hover:border-blue-400 hover:shadow-md",
        isDragging && "opacity-0" // 원본은 투명하게 숨김 (DragOverlay가 대신 보임)
      )}
    >
      <div className="flex justify-between items-start">
        <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
          <MapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-slate-300 hover:text-red-500"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(place.placeId);
          }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
      <div className="mt-1 flex items-end justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-700 line-clamp-2 flex-1">{place.title}</h3>
        <GripVertical className="w-4 h-4 text-slate-300" />
      </div>
    </div>
  );
});

// 2. 드래그 로직을 담당하는 래퍼 컴포넌트
export const DraggableListCard = ({ place, onRemove }: DraggableListCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: place.placeId,
    data: { place, from: "SelectedListCard" },
  });

  const style = {
    // 원본 카드는 드래그 중에 위치가 변하면 안 되므로 transform을 제거합니다.
    transform: isDragging ? undefined : CSS.Translate.toString(transform),
  };

  return (
    <ListCardUI
      place={place}
      onRemove={onRemove}
      isDragging={isDragging}
      style={style}
      listeners={listeners}
      attributes={attributes}
      setNodeRef={setNodeRef}
    />
  );
};