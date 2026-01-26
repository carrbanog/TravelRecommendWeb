import { Marker, Polyline } from "@react-google-maps/api";
import { usePlanCardsStore } from "../../../entities/travel-plan/model/usePlanCardsStore";
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { useSelectedPlacesStore } from "../../../entities/place/model/selectedPlacesStore";
import { TravelDayList } from "../../../entities/travel-plan/ui/TravelDayList";

interface TravelPathMapWidgetProps {
  onBackClick: () => void;
}

export const TravelPathMapWidget = ({
  onBackClick,
}: TravelPathMapWidgetProps) => {
  const { planCards } = usePlanCardsStore();
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const colors = ["#FF0000", "#007BFF", "#00C851", "#FF8800"]; // Day-specific polyline colors
  console.log(planCards);
  // selectedPlaces가 비어있을 때 오류가 나지 않도록 초기 중심값 설정
  const initialCenter =
    selectedPlaces.length > 0
      ? selectedPlaces[0].nearCoordinates
      : { lat: 37.5665, lng: 126.978 }; // Default to Seoul if no places

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

          {planCards.map((card, idx) => {
            const pathCoordinates = card.places
              ?.map((p) => p.nearCoordinates)
              .filter(Boolean);

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
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            여행 경로 정보 🗺️
          </h2>

          {planCards.map((dayPlan, dayIndex) => (
            <TravelDayList
              key={dayPlan.id}
              dayIndex={dayIndex}
              places={dayPlan.places}
            />
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
