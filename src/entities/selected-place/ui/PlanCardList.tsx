// src/entities/selected-place/ui/PlanCardList.tsx
import { DroppableDayCard } from "./DroppableDayCard";
import { usePlanCardsStore } from '../../travel-plan/model/usePlanCardsStore';

// type PlanCardListProps = {
//   tripDays: number;
// };

export const PlanCardList = () => {
  // 로컬 상태 (prop으로 planCards가 전달되지 않으면 이걸 사용)
  const planCards = usePlanCardsStore((s) => s.planCards)

  return (
    <>
      <div className="p-4 border-t border-gray-200 flex gap-4 items-center"></div>

      <div className="p-4 flex gap-4 overflow-x-auto">
        {planCards.map((card) => (
          // DroppableDayCard는 내부에서 useDroppable(id=`day-${card.id}`)를 사용합니다.
          <DroppableDayCard key={card.id} card={card} />
        ))}
      </div>
    </>
  );
};
