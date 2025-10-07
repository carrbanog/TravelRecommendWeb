import type { PlanCard } from '../model/planCardType';
import { MdDelete } from "react-icons/md";
type PlanCardListProps = {
  tripDays: number
}



export const PlanCardList = ({tripDays}: PlanCardListProps) => {
  const planCards: PlanCard[] = Array.from({length: tripDays}, (_, i) => ({
    id: i + 1,
    places: [],
  }))
  return (
    <>
      <div className="p-4 border-t border-gray-200 flex gap-4 items-center">
        {/* 필요하면 여기에 버튼 영역 추가 가능 */}
      </div>
      <div className="p-4 flex gap-4 overflow-x-auto">
        {planCards.map((card) => (
          <div
            key={card.id}
            className="w-full bg-gradient-to-r from-slate-100 to-slate-200 shadow-lg rounded-2xl shadow-sm hover:shadow-md p-4 transition-all cursor-grab active:cursor-grabbing"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-lg">Day {card.id}</div>
            </div>
            {/* 드롭된 장소들을 표시 */}
            <ul className="space-y-1 text-sm text-gray-700">
              {card.places?.map((place, idx) => (
                <li key={idx}>📍 {place}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
