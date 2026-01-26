import type { PlanPlace } from '../../place/model/type';

interface TravelDayListProps {
  dayIndex: number;
  places: PlanPlace[] | undefined;
}

// 사용자가 선택한 최종 여행지 정보
export const TravelDayList = ({ dayIndex, places }: TravelDayListProps) => {
  return(
      <div>
    <h3 className="text-lg font-semibold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">
      Day {dayIndex + 1}
    </h3>
    {/* 장소 배열이 비어있지 않은 경우에만 목록을 표시 */}
    {places && places.length > 0 ? (
      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        {places.map((place) => (
          
          <li key={place.id} className="pl-2">
            {place.title}
          </li>
        ))}
      </ol>
    ) : (
      <p className="text-gray-500 pl-2">계획된 장소가 없습니다.</p>
    )}
  </div>
  )

};
