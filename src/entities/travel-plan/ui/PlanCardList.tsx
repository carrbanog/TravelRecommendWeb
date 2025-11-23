// src/entities/selected-place/ui/PlanCardList.tsx
import { DroppableDayCard } from "./DroppableDayCard";
import { usePlanCardsStore } from "../model/usePlanCardsStore";

// type PlanCardListProps = {
//   tripDays: number;
// };

export const PlanCardList = () => {
  const planCards = usePlanCardsStore((s) => s.planCards);

  return (
    <div className="flex-1 flex gap-4 p-4 overflow-x-auto overflow-y-hidden">
      {planCards.map((card) => (
        <div key={card.id} className="flex-shrink-0 w-80 h-full">
          <DroppableDayCard card={card} />
        </div>
      ))}
    </div>
  );
};