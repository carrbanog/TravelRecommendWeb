import { DroppableDayCard } from "./DroppableDayCard";
import { usePlanCardsStore } from "../model/usePlanCardsStore";
import { CalendarDays, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const PlanCardList = () => {
  const planCards = usePlanCardsStore((s) => s.planCards);

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* 영역 헤더: 현재 일정 정보 요약 */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/80 border-b border-slate-100 backdrop-blur-sm sticky left-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <CalendarDays className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">여행 타임라인</h2>
          <Badge
            variant="outline"
            className="ml-1 border-blue-200 text-blue-600 bg-blue-50/50"
          >
            {planCards.length}일차 구성
          </Badge>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-slate-400 text-xs font-medium">
          <Info className="w-3.5 h-3.5" />
          <span>보관함의 장소를 각 일차로 드래그하세요</span>
        </div>
      </div>

      {/* 카드 리스트: 가로 스크롤 영역 */}
      <div className="flex-1 flex gap-6 p-6 overflow-x-auto overflow-y-hidden custom-scrollbar scroll-smooth">
        {planCards.length > 0 ? (
          planCards.map((card, index) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-[320px] h-full flex flex-col"
            >
              {/* 일차 표시 가이드 (DroppableDayCard 외부에 추가적인 구분감을 줄 수 있음) */}
              <div className="mb-3 px-1 flex items-baseline gap-2">
                <span className="text-xl font-black text-slate-300">
                  DAY {index + 1}
                </span>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                  Itinerary
                </span>
              </div>

              <div className="flex-1 min-h-0">
                <DroppableDayCard card={card} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
            <p>설정된 여행 날짜가 없습니다.</p>
          </div>
        )}

        {/* 스크롤 끝 여백 확보용 div */}
        <div className="flex-shrink-0 w-2 h-full" />
      </div>
    </div>
  );
};
