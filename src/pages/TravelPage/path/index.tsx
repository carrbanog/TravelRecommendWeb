import { useEffect } from "react";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { Marker } from "@react-google-maps/api";

import { useNavigate } from "react-router-dom";

const TravelPathPage = () => {
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

  return (
    <div className="h-screen w-full flex flex-col">
      {/* 상단 헤더 */}

      {/* 본문 */}
      <main className="flex flex-1 gap-4 p-4">
        {/* 지도 영역 70% */}
        <div className="w-[30%] rounded-lg overflow-hidden shadow-md">
          <MyMap >
            {selectedPlaces.map((placeItem, idx) => (
              <Marker key={idx} position={placeItem.nearCoordinates} />
            ))}
          </MyMap>
        </div>
      </main>
    </div>
  );
};

export default TravelPathPage;
