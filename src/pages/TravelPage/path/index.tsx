// 1. External Libraries (외부 라이브러리)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 2. Entities Layer (내부 도메인/데이터 상태 관리)
import { useSelectedPlacesStore } from "@/entities/place/model/selectedPlacesStore";
import { useDayPickerStore } from "@/entities/travel-plan/model/useDayPickerStore";
import { usePlanCardsStore } from "@/entities/travel-plan/model/usePlanCardsStore";

// 3. Widgets Layer (상위 UI 컴포넌트)
import { TravelPathMapWidget } from '@/widgets/travel-planner/ui/TravelPathMapWidget';
import { TravelPlannerWidget } from '@/widgets/travel-planner/ui/TravelPlannerWidget';

const TravelPathPage = () => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const setCenter = useSelectedPlacesStore((s) => s.setCenter);
  const tripDays = useDayPickerStore((s) => s.tripDays);
  const { planCards, initialize } = usePlanCardsStore();
  const [path, setPath] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    initialize(tripDays);
  }, []);
  console.log(planCards);

  // 지도 중심값 / 새로고침 시 이동 처리
  useEffect(() => {
    if (selectedPlaces.length > 0) {
      setCenter(selectedPlaces[0].nearCoordinates);
      console.log("travel path page")
    } else {
      navigate("/travel", { replace: true });
    }
  }, [selectedPlaces, setCenter, navigate]);

  console.log("-----------------------------------travel/path 페이지 렌더링-----------------------------------");
  return (
    <div className="h-full w-full">
      {!path ? (
        <TravelPlannerWidget onShowPathClick={() => setPath(true)} />
      ) : (
        <TravelPathMapWidget onBackClick={() => setPath(false)} />
      )}
    </div>
  );
};

export default TravelPathPage;
