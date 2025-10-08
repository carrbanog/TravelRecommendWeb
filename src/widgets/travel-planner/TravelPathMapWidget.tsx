import { Marker, Polyline } from "@react-google-maps/api";
import { usePlanCardsStore } from "../../entities/travel-plan/model/usePlanCardsStore";
import MyMap from "../../shared/ui/GoogleMap/MyMap";
import { useSelectedPlacesStore } from "../../entities/selected-place/model/selectedPlacesStore";

interface TravelPathMapWidgetProps {
  onBackClick: () => void;
}

export const TravelPathMapWidget = ({ onBackClick }: TravelPathMapWidgetProps) => {
  const { planCards } = usePlanCardsStore();
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const PlanCards = usePlanCardsStore((s) => s.planCards)
  const colors = ["#FF0000", "#007BFF", "#00C851", "#FF8800"]; // Day-specific polyline colors

  console.log(PlanCards)
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

      {/* 사이드 영역 (30%) */}
      <div className="w-[30%] h-full flex flex-col gap-4">
        <div className="flex-1 p-4 bg-white rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-4">여행 경로 정보 🗺️</h2>
          <p className="text-gray-700">
            각 일자별 여행 경로입니다.
            <br />
            {/* 여기에 나중에 추가적인 정보나 컨트롤 UI를 넣을 수 있습니다. */}
          </p>
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