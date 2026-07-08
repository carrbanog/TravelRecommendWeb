import { memo } from "react";
import { Trash2, MapPin, Hotel, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SelectedPlace } from "@/shared/types/nearPlaceType";

interface ListCardUIProps {
  place: SelectedPlace;
  onRemovePlace: (placeId: string) => void;
  isDragging?: boolean;
  style?: React.CSSProperties;
  listeners?: any;
  attributes?: any;
  setNodeRef?: (node: HTMLElement | null) => void;
}

export const ListCardUI = memo(({
  place,
  onRemovePlace,
  style,
  listeners,
  attributes,
  setNodeRef,
}: ListCardUIProps) => {
  console.log(`ListCardUI 렌더링: ${place.type}`, style);

  // 🌟 타입에 따른 아이콘 및 스타일 분기 정의
  const isHotel = place.type === "hotel";
  const Icon = isHotel ? Hotel : MapPin;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "group relative flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-3 shadow-sm transition-all cursor-grab active:cursor-grabbing",
        // 🌟 호버 시 호텔은 인디고(보라), 여행지는 블루(파랑) 테두리 피드백
        isHotel ? "hover:border-orange-600 hover:shadow-md" : "hover:border-blue-400 hover:shadow-md",
      )}
    >
      <div className="flex justify-between items-start">
        {/* 🌟 아이콘 배경색 분기 처리 */}
        <div className={cn(
          "p-1.5 bg-slate-50 rounded-lg transition-colors",
          isHotel ? "group-hover:bg-indigo-50" : "group-hover:bg-blue-50"
        )}>
          {/* 🌟 동적 아이콘 랜더링 및 컬러 분기 처리 */}
          <Icon className={cn(
            "w-4 h-4 text-slate-400 transition-colors",
            isHotel ? "group-hover:text-orange-600" : "group-hover:text-blue-500"
          )} />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-slate-300 hover:text-red-500"
          onPointerDown={(e) => e.stopPropagation()} // 버튼 클릭 시 드래그 이벤트 전파 방지
          onClick={(e) => {
            e.stopPropagation();
            onRemovePlace(place.placeId);
          }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="mt-1 flex items-end justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-700 line-clamp-2 flex-1">
          {place.title}
        </h3>
        <GripVertical className="w-4 h-4 text-slate-300" />
      </div>
    </div>
  );
});

ListCardUI.displayName = "ListCardUI";