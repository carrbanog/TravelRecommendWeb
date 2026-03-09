import { Marker, Polyline, InfoWindow } from "@react-google-maps/api";

// 2. Features (비즈니스 로직, API 호출 관련)
import { usePlaceDetailsQuery } from "@/features/place-details/lib/usePlaceDetailsQuery";

// 3. Entities (데이터 모델, 상태 관리, 도메인 UI)
import { usePlanCardsStore } from "../../../entities/travel-plan/model/usePlanCardsStore";
import { useSelectedPlacesStore } from "../../../entities/place/model/selectedPlacesStore";
import { TravelDayList } from "../../travel-plan/TravelDayList";
import { PlaceInfoWindow } from "@/entities/place/ui/PlaceInfoWindow";

// 4. Shared (공통 훅, 공통 UI, 유틸리티)
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { useMapHover } from "@/shared/lib/hooks/useMapHover";

interface TravelPathMapWidgetProps {
  onBackClick: () => void;
}

export const TravelPathMapWidget = ({
  onBackClick,
}: TravelPathMapWidgetProps) => {
  const { planCards } = usePlanCardsStore();
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const colors = ["#FF0000", "#007BFF", "#00C851", "#FF8800"];

  const { hoveredPlace, handleMouseOver, handleMouseOut } = useMapHover(400);

  const { data: detailData, isLoading: detailLoading } = usePlaceDetailsQuery(
    hoveredPlace?.placeId || "",
  );
  // selectedPlaces가 비어있을 때 오류가 나지 않도록 초기 중심값 설정
  const initialCenter =
    selectedPlaces.length > 0
      ? selectedPlaces[0].nearCoordinates
      : { lat: 37.5665, lng: 126.978 };

  return (
    // 전체 레이아웃을 flex 컨테이너로 변경
    <main className="h-full w-full flex gap-4 p-4 bg-gray-50">
      {/* 지도 영역 (70%) */}
      <div className="w-[70%] h-full rounded-lg overflow-hidden shadow-xl">
        <MyMap place={initialCenter}>
          {selectedPlaces.map((place) => (
            <Marker
              key={place.placeId}
              position={place.nearCoordinates}
              title={place.title}
              onMouseOver={() => handleMouseOver(place)}
              onMouseOut={handleMouseOut}
            >
              {hoveredPlace?.placeId === place.placeId && detailData && (
                <InfoWindow>
                  {detailLoading ? (
                    <div style={{ padding: "8px", fontSize: "12px" }}>
                      로딩 중...
                    </div>
                  ) : (
                    <PlaceInfoWindow place={detailData} />
                  )}
                </InfoWindow>
              )}
            </Marker>
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
