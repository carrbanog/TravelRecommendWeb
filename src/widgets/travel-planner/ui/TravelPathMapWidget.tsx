import { Marker, Polyline } from "@react-google-maps/api";
import { usePlanCardsStore } from "../../../entities/travel-plan/model/usePlanCardsStore";
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";

interface TravelPathMapWidgetProps {
  onBackClick: () => void;
}

export const TravelPathMapWidget = ({ onBackClick }: TravelPathMapWidgetProps) => {
  const { planCards } = usePlanCardsStore();
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const colors = ["#FF0000", "#007BFF", "#00C851", "#FF8800"]; // Day-specific polyline colors

  // selectedPlaces가 비어있을 때 오류가 나지 않도록 초기 중심값 설정
  const initialCenter =
    selectedPlaces.length > 0
      ? selectedPlaces[0].nearCoordinates
      : { lat: 37.5665, lng: 126.9780 }; // Default to Seoul if no places

  return (
    // 전체 레이아웃을 flex 컨테이너로 변경
    <main className="h-full w-full flex gap-4 p-4 bg-gray-50">
      {/* 지도 영역 (70%) */}
      <div className="w-[70%] h-full rounded-lg overflow-hidden shadow-xl">
        <MyMap place={initialCenter}>
          {/* Render all selected places as markers */}
          {selectedPlaces.map((place) => (
            <Marker
              key={place.placeId}
              position={place.nearCoordinates}
              title={place.title}
            />
          ))}

          {/* Render a polyline for each day's plan */}
          {planCards.map((card, idx) => {
            const pathCoordinates = card.places
              ?.map((p) => p.nearCoordinates)
              .filter(Boolean); // Ensure coordinates are not null/undefined

            return (
              pathCoordinates &&
              pathCoordinates.length > 1 && (
                <Polyline
                  key={card.id}
                  path={pathCoordinates}
                  options={{
                    strokeColor: colors[idx % colors.length],
                    strokeWeight: 4,
                  }}
                />
              )
            );
          })}
        </MyMap>
      </div>

      {/* 사이드 영역 (30%) - 수정된 부분 */}
      <div className="w-[30%] h-full flex flex-col gap-4">
        <div className="flex-1 p-6 bg-white rounded-lg shadow-xl overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">여행 경로 정보 🗺️</h2>
          
          {planCards.map((dayPlan, dayIndex) => (
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
            </div>
          ))}
        </div>
        <button
          onClick={onBackClick}
          className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          계획 수정하기
        </button>
      </div>
    </main>
  );
};