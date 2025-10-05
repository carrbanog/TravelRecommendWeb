import { useEffect, useState } from "react";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { Marker } from "@react-google-maps/api";

import { useNavigate } from "react-router-dom";
import { SelectedListCard } from '../../../entities/selected-place/ui/SelectedListCard';

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
        <div className="p-4 border-t border-gray-200 flex gap-4 items-center">
          <button
            onClick={handleAddPlanCard}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            계획 추가하기
          </button>
        </div>
        <div className="p-4 flex gap-4 overflow-x-auto">
          {planCards.map((card) => (
            <div
              key={card.id}
              className="w-full bg-gray-50 rounded-2xl shadow-sm hover:shadow-md p-4 transition-all cursor-grab active:cursor-grabbing"
            >
              Day {card.id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelPathPage;
