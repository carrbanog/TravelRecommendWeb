import { useDroppable } from "@dnd-kit/core";
import type { PlanCard } from "../model/planCardType";
import { MdDelete } from "react-icons/md";
import { usePlanCardsStore } from '../../travel-plan/model/usePlanCardsStore';

type DroppableDayCardProps = {
  card: PlanCard;
};

export const DroppableDayCard = ({ card }: DroppableDayCardProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: `day-${card.id}` });
  const removePlaceToDay = usePlanCardsStore((s) => s.removePlaceToDay)

  return (
    <div
      ref={setNodeRef}
      className={`w-full bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl p-4 shadow-md transition-all ${
        isOver ? "ring-4 ring-blue-300" : ""
      }`}
      style={{ height: "300px", boxSizing: "border-box" }} // 카드 높이 고정
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-lg">Day {card.id}</div>
      </div>

      {/* 장소 리스트 */}
      <ul
        className="space-y-2 overflow-y-auto pr-2"
        style={{ maxHeight: "calc(100% - 3rem)" }} // header 높이 제외
      >
        {card.places?.map((place, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition"
          >
            <span className="text-slate-800 font-medium">📍 {place.title}</span>
            <button
              className="hover:text-red-700 font-bold ml-4" // place.id를 이용해 삭제
              onClick={() => removePlaceToDay(card.id, place)}
            >
              <MdDelete />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
