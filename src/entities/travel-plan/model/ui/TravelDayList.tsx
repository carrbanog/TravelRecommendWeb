
interface TravelDayListProps = {
  dayIndex: Number;
  places
}


export const TravelDayList = ({ dayIndex, places }) => {
  <div key={dayPlan.id} className="mb-6">
    <h3 className="text-lg font-semibold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">
      Day {dayIndex + 1}
    </h3>
    {/* 장소 배열이 비어있지 않은 경우에만 목록을 표시 */}
    {dayPlan.places && dayPlan.places.length > 0 ? (
      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        {dayPlan.places.map((place) => (
          <li key={place.id} className="pl-2">
            {place.title}
          </li>
        ))}
      </ol>
    ) : (
      <p className="text-gray-500 pl-2">계획된 장소가 없습니다.</p>
    )}
  </div>;
};
