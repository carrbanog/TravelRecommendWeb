// src/pages/travel/TravelPathPage.tsx
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEffect } from "react";
import { SelectedListCard } from "../../../entities/selected-place/ui/SelectedListCard";
import { PlanCardList } from "../../../entities/selected-place/ui/PlanCardList";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import { useTravelPlanStore } from "../../../entities/travel-plan/model/useTravelPlanStore";
import { useNavigate } from "react-router-dom";
import { usePlanCardsStore } from '../../../entities/travel-plan/model/usePlanCardsStore';
import { handleDragEnd } from '../../../features/travel/travel-path/lib/handleDragEnd';

const TravelPathPage = () => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const setCenter = useSelectedPlacesStore((s) => s.setCenter);
  const tripDays = useTravelPlanStore((s) => s.tripDays);
  const {planCards, initialize} = usePlanCardsStore();

  const navigate = useNavigate();

  useEffect(() => {
    initialize(tripDays);
  }, [])
  console.log(planCards)

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


  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-[80%] h-[85%] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
          <SelectedListCard selectedPlaces={selectedPlaces} />
          {/* planCards와 setPlanCards를 prop으로 전달 */}
          <PlanCardList />
        </div>
      </div>
    </DndContext>
  );
};

export default TravelPathPage;
