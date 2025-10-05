
type PlanCardListProps = {
  planCards: {
    id: number;
  }[]
  onAddCard:() => void;
}



export const PlanCardList = ({planCards, onAddCard}: PlanCardListProps) => {
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
            className="w-full bg-gray-50 rounded-2xl shadow-sm hover:shadow-md p-4 transition-all cursor-grab active:cursor-grabbing"
          >
            Day {card.id}
          </div>
        ))}
      </div>
    </>
  );
};
