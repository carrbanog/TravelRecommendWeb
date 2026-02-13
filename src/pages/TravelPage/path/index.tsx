// src/pages/travel/TravelPathPage.tsx
import {
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useSelectedPlacesStore } from "../../../entities/place/model/selectedPlacesStore";
import { useDayPickerStore } from "../../../entities/travel-plan/model/useDayPickerStore";
import { useNavigate } from "react-router-dom";
import { usePlanCardsStore } from "../../../entities/travel-plan/model/usePlanCardsStore";
import { TravelPlannerWidget } from '../../../widgets/travel-planner/ui/TravelPlannerWidget';
import { TravelPathMapWidget } from '../../../widgets/travel-planner/ui/TravelPathMapWidget';

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
    } else {
      navigate("/travel", { replace: true });
    }
  }, [selectedPlaces, setCenter, navigate]);

  // dnd-kit 센서 (PointerSensor 사용)
  const sensors = useSensors(useSensor(PointerSensor)); //마우스 감지
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
