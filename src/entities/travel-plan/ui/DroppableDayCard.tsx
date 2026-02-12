import { useDroppable } from "@dnd-kit/core";
import type { PlanCard } from "../../place/model/type";
import { Trash2, MapPin, CalendarPlus } from "lucide-react";
import { usePlanCardsStore } from "../model/usePlanCardsStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type DroppableDayCardProps = {
  card: PlanCard;
};

export const DroppableDayCard = ({ card }: DroppableDayCardProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: `day-${card.id}` });
  const removePlaceToDay = usePlanCardsStore((s) => s.removePlaceToDay);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "w-full flex flex-col bg-white rounded-[1.5rem] border border-slate-200 shadow-sm transition-all duration-300",
        "h-[400px]", // 높이를 조금 더 여유 있게 조정
        isOver
          ? "ring-2 ring-blue-500 bg-blue-50/50 border-blue-200 scale-[1.02]"
          : "bg-white",
      )}
    >
      {/* 카드 헤더 */}
      <div className="flex justify-between items-center p-4 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white text-xs font-bold">
            {card.id}
          </span>
          <span className="font-bold text-slate-700">Day {card.id} 일정</span>
        </div>
        {card.places && card.places.length > 0 && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            {card.places.length} Places
          </span>
        )}
      </div>

      {/* 장소 리스트 영역 */}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        {card.places && card.places.length > 0 ? (
          <ul className="space-y-2.5">
            {card.places.map((place, idx) => (
              <li
                key={`${place}-${idx}`}
                className="group flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 transition-all hover:bg-white hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* 동선 번호 표시 */}
                  <span className="flex-none w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-[10px] font-black">
                    {idx + 1}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-slate-700 truncate">
                      {place.title}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                  onClick={() => removePlaceToDay(card.id, place)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-100 rounded-2xl">
            <CalendarPlus className="w-8 h-8 text-slate-200 mb-2" />
            <p className="text-xs text-slate-400 leading-relaxed">
              장소 보관함에서
              <br />
              여행지를 끌어다 놓으세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
