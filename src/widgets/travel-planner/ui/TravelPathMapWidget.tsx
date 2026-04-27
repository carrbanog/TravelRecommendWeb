import { Marker, Polyline, InfoWindow } from "@react-google-maps/api";

// 2. Features
import { usePlaceDetailsQuery } from "@/features/place-details/lib/usePlaceDetailsQuery";
import { useRouteDirections } from "@/features/travel-route/lib/useRouteDirections";

// 3. Entities
import { usePlanCardsStore } from "../../../entities/travel-plan/model/usePlanCardsStore";
import { useSelectedPlacesStore } from "../../../entities/place/model/selectedPlacesStore";
import { TravelDayList } from "../../travel-plan/TravelDayList";
import { PlaceInfoWindow } from "@/entities/place/ui/PlaceInfoWindow";

// 4. Shared
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { useMapHover } from "@/shared/lib/hooks/useMapHover";
import { useState } from "react";

interface TravelPathMapWidgetProps {
  onBackClick: () => void;
}

export const TravelPathMapWidget = ({
  onBackClick,
}: TravelPathMapWidgetProps) => {
  const { planCards } = usePlanCardsStore();
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const [activeTab, setActiveTab] = useState(0);
  const colors = ["#FF0000", "#007BFF", "#00C851", "#FF8800"];

  // 마우스를 올린 장소의 위치 정보를 가져오는 훅
  const { hoveredPlace, handleMouseOver, handleMouseOut } = useMapHover(400);

  // ✅ 위치 정보를 가지고 상세 정보를 가져오는 쿼리 훅
  const { data: detailData, isLoading: detailLoading } = usePlaceDetailsQuery(
    hoveredPlace?.placeId || "",
  );
  console.log("Detail Data:", detailData, "Hovered Place:", hoveredPlace);
  // ✅ Directions API 호출 로직
  const { roadPaths } = useRouteDirections(planCards);
  console.log("Road Paths:", roadPaths, "Plan Cards:", planCards, planCards[0]);
  const initialCenter =
    selectedPlaces.length > 0
      ? selectedPlaces[0].nearCoordinates
      : { lat: 37.5665, lng: 126.978 };

  return (
    <main className="h-full w-full flex gap-4 p-4 bg-gray-50">
      {/* 지도 영역 (70%) */}
      <div className="w-[70%] h-full rounded-lg overflow-hidden shadow-xl">
        <MyMap place={initialCenter}>
          {/* 마커 렌더링 */}
          {selectedPlaces.map((place) => (
            <Marker
              key={place.placeId}
              position={place.nearCoordinates}
              title={place.title}
              onMouseOver={() => handleMouseOver(place)}
              onMouseOut={handleMouseOut}
            >
              {hoveredPlace?.placeId === place.placeId && detailData && (
                <InfoWindow
                  options={{
                    disableAutoPan: true, // 마커에 마우스 올릴 때 지도 자동 이동 방지
                  }}
                >
                  {detailLoading ? (
                    <div className="p-2 text-xs">로딩 중...</div>
                  ) : (
                    <PlaceInfoWindow place={detailData} />
                  )}
                </InfoWindow>
              )}
            </Marker>
          ))}

          {/* ✅ 실제 도로 기반 Polyline 렌더링 */}
          {planCards[activeTab] && roadPaths[planCards[activeTab].id] && (
            <Polyline
              key={planCards[activeTab].id}
              path={roadPaths[planCards[activeTab].id]}
              options={{
                // 현재 선택된 날짜의 인덱스에 맞는 색상 적용
                strokeColor: colors[activeTab % colors.length],
                strokeWeight: 5,
                strokeOpacity: 0.8,
              }}
            />
          )}
        </MyMap>
      </div>

      {/* 사이드 정보 영역 (30%) */}
      <div className="w-[30%] h-full flex flex-col gap-4">
        <div className="flex-1 p-6 bg-white rounded-lg shadow-xl overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            여행 경로 정보 🗺️
          </h2>
          <div className="flex gap-2 mb-4">
            {planCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: activeTab === index ? "#3b82f6" : "#e5e7eb",
                  color: activeTab === index ? "white" : "black",
                  borderRadius: "4px",
                }}
              >
                Day {index + 1}
              </button>
            ))}
          </div>
          {planCards[activeTab] && (
            <TravelDayList
              key={planCards[activeTab].id}
              dayIndex={activeTab}
              places={planCards[activeTab].places}
            />
          )}
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
