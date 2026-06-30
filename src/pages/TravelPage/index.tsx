import { useState, useEffect } from "react";

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

  console.log("여행지 검색 요청", nearPlaces);
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces); // 추천여행지에서 선택한 리스트 모음
  const addPlace = useSelectedPlacesStore((s) => s.addPlace); // 마커 클릭 시 selectedPlaces에 추가
  const removePlace = useSelectedPlacesStore((s) => s.removePlace); // 제거

  const center = useSelectedPlacesStore((s) => s.center);
  const setCenter = useSelectedPlacesStore((s) => s.setCenter);

  useEffect(() => {
    if (nearPlaces?.location) {
      setCenter(nearPlaces.location);
    }
  }, [nearPlaces?.location, setCenter]);
  return (
    /**
     * 1. h-screen: 뷰포트 높이 고정
     * 2. overflow-hidden: 페이지 전체 스크롤 방지
     */
      <main className="h-full w-full flex gap-4 p-4 bg-gray-50">
        {/* 지도 영역 (70%) */}
        <div className="w-[70%] h-full rounded-lg overflow-hidden shadow-xl">
          <TravelMapWidget
            centerCoords={center}
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
  );
};
