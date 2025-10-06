import type { PlanCard } from '../model/planCardType';
import { MdDelete } from "react-icons/md";
type PlanCardListProps = {
  planCards: PlanCard[];
  onAddCard:() => void;
  onDeleteCard:(id:number) => void
}



export const PlanCardList = ({planCards, onAddCard, onDeleteCard}: PlanCardListProps) => {
  return (
    <>
      <div className="p-4 border-t border-gray-200 flex gap-4 items-center">
        <button
          onClick={onAddCard}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          계획 추가하기
        </button>
      </div>
      <div className="p-4 flex gap-4 overflow-x-auto">
        {planCards.map((card) => (
          <div
            key={card.id}
            className="w-full bg-gradient-to-r from-slate-100 to-slate-200 shadow-lg rounded-2xl shadow-sm hover:shadow-md p-4 transition-all cursor-grab active:cursor-grabbing"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-lg">Day {card.id}</div>
              <div className="text-gray-400 hover:text-red-500 transition cursor-pointer" onClick={() => onDeleteCard(card.id)}>
                <MdDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
