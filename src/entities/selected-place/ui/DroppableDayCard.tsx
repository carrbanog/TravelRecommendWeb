import { useDroppable } from "@dnd-kit/core";
import type { PlanCard } from "../model/planCardType";

type DroppableDayCardProps = {
  card: PlanCard;
};

export const DroppableDayCard = ({ card }: DroppableDayCardProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `day-${card.id}`, // DnD에서 구분할 ID
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl p-4 shadow-md transition-all ${
        isOver ? "ring-4 ring-blue-300" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-lg">Day {card.id}</div>
      </div>

      <ul className="space-y-1 text-sm text-gray-700">
        {card.places?.map((place, idx) => (
          <li key={idx}>📍 {place}</li>
        ))}
      </ul>
    </div>
  );
};
