import { useState } from "react";

import { useGeocodeQuery } from "../../features/search-plcae/lib/useGeoCodeQuery";
import { useNearcodeQuery } from "../../features/find-nearby-places/lib/useNearByPlacesQuery";
import { useSelectedPlacesStore } from "../../entities/place/model/selectedPlacesStore";
import type { SearchParams } from "../../entities/place/model/type";
import { TravelMapWidget } from "../../widgets/travel-map/ui/TravelMapWidget";
import { PlanningSidebarWidget } from "../../widgets/planning-sidebar/ui/PlanningSidebarWidget";

export const TravelPage = () => {
  console.log("TravelPage 렌더링");
  const [placeSearch, setPlaceSearch] = useState<SearchParams>({
    query: "",
    type: "place",
  });


  const { data: nearPlaces, isLoading: isloadingPlaces } = useNearcodeQuery({
    query: placeSearch.query,
    type: placeSearch.type,
  });

  console.log("여행지 검색 요청", nearPlaces)
  const centerCoords = nearPlaces?.location ?? undefined; //지도 중앙 위치
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces); // 추천여행지에서 선택한 리스트 모음
  const addPlace = useSelectedPlacesStore((s) => s.addPlace); // 마커 클릭 시 selectedPlaces에 추가
  const removePlace = useSelectedPlacesStore((s) => s.removePlace); // 제거

  return (
    /**
     * 1. h-screen: 뷰포트 높이 고정
     * 2. overflow-hidden: 페이지 전체 스크롤 방지
     */
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50">
      {/* 본문 (지도 + 검색창) */}
      <main className="flex flex-1 gap-4 p-5 min-h-0">
        {/* 지도 영역 (70%) */}
        <div className="w-[70%] h-full rounded-lg overflow-hidden shadow-md">
          <TravelMapWidget
            centerCoords={centerCoords}
            places={nearPlaces?.results}
            onMarkerClick={addPlace}
            isLoading={isloadingPlaces}
          />
        </div>

        {/* 사이드 영역 (30%) */}
        <div className="w-[30%] h-full">
          <PlanningSidebarWidget
            selectedPlaces={selectedPlaces}
            onRemovePlace={removePlace}
            setPlaceSearch={setPlaceSearch}
          />
        </div>
      </main>
    </div>
  );
};
