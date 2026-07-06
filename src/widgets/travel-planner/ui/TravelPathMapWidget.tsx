// 1. Features
import { TravelPathMapCanvas } from "@/features/travel-route/ui/TravelPathMapCanvas";
import { useFetchDistanceQuery } from "@/features/calculate-distance/api/fetchDistance"; // 💡 부모로 이동

// 2. Entities
import { usePlanCardsStore } from "../../../entities/travel-plan/model/usePlanCardsStore";
import { TravelDayList } from "../../travel-plan/TravelDayList";

// 3. Shared
import { useMapHover } from "@/shared/lib/hooks/useMapHover";
import {  useState } from "react";

interface TravelPathMapWidgetProps {
  onBackClick: () => void;
}

export const TravelPathMapWidget = ({
  onBackClick,
}: TravelPathMapWidgetProps) => {
  const { planCards } = usePlanCardsStore();
  const [activeTab, setActiveTab] = useState(0);
  const colors = ["#3B82F6", "#3B82F6", "#3B82F6", "#3B82F6"];
  const { hoveredPlace, handleMouseOver, handleMouseOut } = useMapHover(400);

  const todayPlan = planCards[activeTab]; // 현재 선택된 Day의 여행 계획
  const todayPlaces = planCards[activeTab]?.places; // 현재 선택된 Day의 여행지 정보
  const todayLocations = todayPlaces?.map((place) => place.nearCoordinates) || []; // 현재 선택된 Day의 여행지 좌표만 추출
  const { data: routeData, isLoading: isRouteLoading } =
    useFetchDistanceQuery(todayLocations);

  console.log(
    " ------------------------TravelPathMapWidget 렌더링-----------------------",
  );
  console.log("activeTab:", activeTab, "routeData:", routeData);

  return (
    <main className="h-full w-full flex gap-4 p-4 bg-gray-50">
      {/* 지도 영역 (70%) */}
      <div className="w-[70%] h-full rounded-lg overflow-hidden shadow-xl">
        <TravelPathMapCanvas
          activeTab={activeTab}
          colors={colors}
          hoveredPlace={hoveredPlace}
          onPlaceHover={handleMouseOver}
          onPlaceLeave={handleMouseOut}
          dayIndex={todayPlan?.id}
          places={todayPlaces}
          routeData={routeData}
        />
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
                className={`px-4 py-2 rounded-[4px] font-medium transition-colors ${
                  activeTab === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                Day {index + 1}
              </button>
            ))}
          </div>
          {planCards[activeTab] && (
            <TravelDayList
              key={planCards[activeTab].id}
              dayIndex={activeTab}
              places={todayPlaces}
              onPlaceHover={handleMouseOver}
              onPlaceLeave={handleMouseOut}
              routeData={routeData}
              isLoading={isRouteLoading}
            />
          )}
        </div>
        <button
          onClick={onBackClick}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          계획 수정하기
        </button>
      </div>
    </main>
  );
};
