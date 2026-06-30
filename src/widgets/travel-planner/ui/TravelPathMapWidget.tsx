// 1. Features
import { useRouteDirections } from "@/features/travel-route/lib/useRouteDirections";
import { TravelPathMapCanvas } from "@/features/travel-route/ui/TravelPathMapCanvas";

// 2. Entities
import { usePlanCardsStore } from "../../../entities/travel-plan/model/usePlanCardsStore";
import { TravelDayList } from "../../travel-plan/TravelDayList";

// 3. Shared
import { useMapHover } from "@/shared/lib/hooks/useMapHover";
import { useState } from "react";

interface TravelPathMapWidgetProps {
  onBackClick: () => void;
}

export const TravelPathMapWidget = ({
  onBackClick,
}: TravelPathMapWidgetProps) => {
  const { planCards } = usePlanCardsStore();
  const [activeTab, setActiveTab] = useState(0);
  const colors = ["#FF0000", "#007BFF", "#00C851", "#000000"];

  // 마우스를 올린 장소의 위치 정보를 가져오는 훅
  const { hoveredPlace, handleMouseOver, handleMouseOut } = useMapHover(400);
  const { roadPaths } = useRouteDirections(planCards);
  const currentRoadPath = planCards[activeTab]
    ? roadPaths[planCards[activeTab].id]
    : undefined;
  console.log("Road Paths:", roadPaths, "Plan Cards:", planCards, planCards[0]);

  return (
    <main className="h-full w-full flex gap-4 p-4 bg-gray-50">
      {/* 지도 영역 (70%) */}
      <div className="w-[70%] h-full rounded-lg overflow-hidden shadow-xl">
        {/* 분리된 Feature 지도 컴포넌트 주입 */}
        <TravelPathMapCanvas
          activeTab={activeTab}
          roadPath={currentRoadPath}
          colors={colors}
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
                    ? "bg-blue-500 text-white"
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
              places={planCards[activeTab].places}
              hoveredPlace={hoveredPlace}
              onPlaceHover={handleMouseOver}
              onPlaceLeave={handleMouseOut}
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
