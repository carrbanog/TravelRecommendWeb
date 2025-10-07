import { useEffect, useState } from "react";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { Marker } from "@react-google-maps/api";

import { useNavigate } from "react-router-dom";
import { SelectedListCard } from "../../../entities/selected-place/ui/SelectedListCard";
import { PlanCardList } from "../../../entities/selected-place/ui/PlanCardList";
import { DndContext } from "@dnd-kit/core";
import type { PlanCard } from "../../../entities/selected-place/model/planCardType"
import { handleDragEnd } from '../../../features/travel/travel-path/lib/handleDragEnd';
import { useTravelPlanStore } from '../../../entities/travel-plan/model/useTravelPlanStore';



const TravelPathPage = () => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const setCenter = useSelectedPlacesStore((s) => s.setCenter);
  const navigate = useNavigate();
  const tripDays = useTravelPlanStore((s) => s.tripDays);

  // zustand로 관리하는 지도 중간값 받아오기 없으면 /travel로 이동
  useEffect(() => {
    if (selectedPlaces.length > 0) {
      setCenter(selectedPlaces[0].nearCoordinates);
    } else {
      navigate("/travel", { replace: true }); //새로고침 시 돌아가기
    }
  }, [selectedPlaces]);



  return (
    <DndContext>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {/* 전체 박스 */}
        <div className="w-[80%] h-[85%] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
          {/* 상단: 여행지 카드 리스트 */}
          <SelectedListCard selectedPlaces={selectedPlaces} />
          <PlanCardList tripDays={tripDays} />
        </div>
      </div>
    </DndContext>
  );
};

export default TravelPathPage;
