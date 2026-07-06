import { useState, useEffect, useMemo, lazy, Suspense } from "react";

import { useNearcodeQuery } from "../../features/find-nearby-places/lib/useNearByPlacesQuery";
import { useSelectedPlacesStore } from "../../entities/place/model/selectedPlacesStore";
import type { SearchParams, SearchType } from "../../entities/place/model/type";
import { PlanningSidebarWidget } from "../../widgets/planning-sidebar/ui/PlanningSidebarWidget";
import { MapSkeleton } from "@/widgets/travel-map/ui/MapSkeleton";

const TravelMapWidget = lazy(() =>
  import("@/widgets/travel-map/ui/TravelMapWidget").then((module) => ({
    default: module.TravelMapWidget,
  })),
);

export const TravelPage = () => {
  console.log("TravelPage 렌더링");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<SearchType>("place");

  const handlePlaceSearch = (params: SearchParams) => {
    // 검색 시 입력 값을 state에 저장
    setSearchQuery(params.query);
  };
  //검색어를 입력하면 여행지, 호텔, 좌표를 가져오는 쿼리 실행
  const { data: nearbyData, isLoading } = useNearcodeQuery({
    query: searchQuery,
  });
  const displayPlaces = useMemo(() => {
    if (activeTab === "place") return nearbyData?.places || [];
    if (activeTab === "hotel") return nearbyData?.hotels || [];
    return [];
  }, [activeTab, nearbyData?.places, nearbyData?.hotels]);

  console.log("여행지 검색 요청", nearbyData, searchQuery, activeTab);
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces); // 추천여행지에서 선택한 리스트 모음
  const addPlace = useSelectedPlacesStore((s) => s.addPlace); // 마커 클릭 시 selectedPlaces에 추가
  const removePlace = useSelectedPlacesStore((s) => s.removePlace); // 제거

  const center = useSelectedPlacesStore((s) => s.center);
  const setCenter = useSelectedPlacesStore((s) => s.setCenter);

  // 지도 중심 값 설정
  useEffect(() => {
    const targetLocation = nearbyData?.location || null;
    if (targetLocation) {
      setCenter(targetLocation);
    }
  }, [nearbyData?.location, setCenter]);
  return (
    /**
     * 1. h-screen: 뷰포트 높이 고정
     * 2. overflow-hidden: 페이지 전체 스크롤 방지
     */
    <main className="h-full w-full flex gap-4 p-4 bg-gray-50">
      {/* 지도 영역 (70%) */}
      <div className="w-[70%] h-full rounded-lg overflow-hidden shadow-xl">
        <Suspense fallback={<MapSkeleton />}>
          <TravelMapWidget
            centerCoords={center}
            places={displayPlaces}
            onMarkerClick={addPlace}
            isLoading={isLoading}
          />
        </Suspense>
      </div>

      {/* 사이드 영역 (30%) */}
      <div className="w-[30%] h-full">
        <PlanningSidebarWidget
          setPlaceSearch={handlePlaceSearch}
          selectedPlaces={selectedPlaces}
          onRemovePlace={removePlace}
          activeTab={activeTab} // 선택한 탭을 PlanningSidebarWidget에 전달
          setActiveTab={setActiveTab} // 선택한 탭을 PlanningSidebarWidget에 전달
        />
      </div>
    </main>
  );
};
