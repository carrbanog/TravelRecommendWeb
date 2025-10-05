import { useEffect } from "react";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { Marker } from "@react-google-maps/api";

import { useNavigate } from "react-router-dom";
import { SelectedListCard } from '../../../widgets/selectedListCart/SelectedListCart';

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
    // <div className="h-screen w-full flex flex-col">
    //   {/* 상단 헤더 */}

    //   {/* 본문 */}
    //   <main className="flex flex-1 gap-4 p-4">
    //     {/* 지도 영역 70% */}
    //     <div className="w-[30%] rounded-lg overflow-hidden shadow-md">
    //       <MyMap >
    //         {selectedPlaces.map((placeItem, idx) => (
    //           <Marker key={idx} position={placeItem.nearCoordinates} />
    //         ))}
    //       </MyMap>
    //     </div>
    //   </main>
    // </div>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* 전체 박스 */}
      <div className="w-[80%] h-[85%] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
        {/* 상단: 여행지 카드 리스트 */}
        <SelectedListCard selectedPlaces={selectedPlaces} />

        {/* 하단: 지도 예정 영역 */}
        <section className="basis-[30%] flex items-center justify-center text-gray-400 text-sm bg-gray-50">
          <p>🗺️ 나중에 지도 선택 영역이 여기에 들어갑니다</p>
        </section>
      </div>
    </div>
  );
};

export default TravelPathPage;
