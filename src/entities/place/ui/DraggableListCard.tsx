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

export const DraggableListCard = ({
  place,
  onRemove,
}: DraggableListCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: place.placeId,
      data: {
        place: place,
        from: "SelectedListCard",
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 100 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        // 기본 스타일: 깔끔한 화이트 카드 + 연한 보더
        "group relative flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-3 shadow-sm transition-all cursor-grab active:cursor-grabbing",
        "hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5",
        // 드래그 중 스타일: 푸른색 강조 + 투명도 + 스케일
        isDragging &&
          "opacity-50 border-blue-600 ring-2 ring-blue-600/20 scale-105 shadow-xl rotate-2",
      )}
    >
      {/* 카드 상단: 아이콘 및 삭제 버튼 */}
      <div className="flex justify-between items-start">
        <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
          <MapPin className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
          onPointerDown={(e) => e.stopPropagation()} // 드래그 이벤트 전파 방지
          onClick={(e) => {
            e.stopPropagation();
            onRemove(place.placeId);
          }}
          aria-label={`${place.title} 삭제`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* 카드 하단: 제목 및 드래그 핸들 가이드 */}
      <div className="mt-1 flex items-end justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-700 leading-tight line-clamp-2 flex-1">
          {place.title}
        </h3>
        {/* 시각적 드래그 핸들러 아이콘 */}
        <GripVertical className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
      </div>

      {/* 선택사항: 드래그 중일 때 나타나는 오버레이 안내 */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-600/5 rounded-xl pointer-events-none" />
      )}
    </div>
  );
};
