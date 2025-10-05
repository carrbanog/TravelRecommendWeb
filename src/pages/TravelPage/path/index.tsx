import { useEffect, useState } from "react";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { Marker } from "@react-google-maps/api";

import { useNavigate } from "react-router-dom";
import { SelectedListCard } from '../../../entities/selected-place/ui/SelectedListCard';
import { PlanCardList } from '../../../entities/selected-place/ui/PlanCardList';

  type PlanCard = {
    id: number;
  }

const TravelPathPage = () => {
  const [planCards, setPlanCards] = useState<PlanCard[]>([]);
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const setCenter = useSelectedPlacesStore((s) => s.setCenter);
  const navigate = useNavigate();

  // zustand로 관리하는 지도 중간값 받아오기 없으면 /travel로 이동
  useEffect(() => {
    if (selectedPlaces.length > 0) {
      setCenter(selectedPlaces[0].nearCoordinates);
    } else {
      navigate("/travel", { replace: true }); //새로고침 시 돌아가기
    }
  }, [selectedPlaces]);

  const handleAddPlanCard = () => {
    setPlanCards((prev) => [...prev, {id:prev.length + 1}])
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* 전체 박스 */}
      <div className="w-[80%] h-[85%] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
        {/* 상단: 여행지 카드 리스트 */}
        <SelectedListCard selectedPlaces={selectedPlaces} />
        <PlanCardList planCards={planCards} onAddCard={handleAddPlanCard} />
      </div>
    </div>
  );
};

export default TravelPathPage;
