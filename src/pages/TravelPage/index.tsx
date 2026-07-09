import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

// [Features & Entities Layer]
import { useNearbyPlacesQuery } from "@/features/find-nearby-places/lib/useNearByPlacesQuery";
import { useSelectedPlacesStore } from "@/entities/place/model/selectedPlacesStore";
import type { SearchParams, SearchType } from "@/entities/place/model/type";

// [Widgets Layer]
import { PlanningSidebarWidget } from "@/widgets/planning-sidebar/ui/PlanningSidebarWidget";
import { MapSkeleton } from "@/shared/ui/GoogleMap/MapSkeleton";

// Lazy Loaded Widgets
const TravelMapWidget = lazy(() =>
  import("@/widgets/travel-map/ui/TravelMapWidget").then((module) => ({
    default: module.TravelMapWidget,
  })),
);

export const TravelPage = () => {
  const navigate = useNavigate();
  
  // ==========================================
  // 1. State & Hooks
  // ==========================================
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<SearchType>("place");

  // Global Store States (Zustand)
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const addPlace = useSelectedPlacesStore((s) => s.addPlace);
  const removePlace = useSelectedPlacesStore((s) => s.removePlace);
  const center = useSelectedPlacesStore((s) => s.center);
  const setCenter = useSelectedPlacesStore((s) => s.setCenter);
  const rememberedData = useSelectedPlacesStore((s) => s.rememberedData);
  const setRememberedData = useSelectedPlacesStore((s) => s.setRememberedData);

  // ==========================================
  // 2. Data Queries & Memoization
  // ==========================================
  const { data: nearbyData, isLoading } = useNearbyPlacesQuery({ query: searchQuery });
  const currentData = nearbyData || rememberedData;

  // 데이터 결합 로직 최적화 (currentData 기준 의존성 관리)
  const displayPlaces = useMemo(() => {
    if (activeTab === "place") return currentData?.places || [];
    if (activeTab === "hotel") return currentData?.hotels || [];
    return [];
  }, [activeTab, currentData]);

  // ==========================================
  // 3. Side Effects (Effects)
  // ==========================================
  
  // 모바일 디바이스 감지 (Resize 이벤트)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 쿼리 결과 스토어 백업
  useEffect(() => {
    if (nearbyData) {
      setRememberedData(nearbyData);
    }
  }, [nearbyData, setRememberedData]);

  // 지도 중심좌표 동기화
  useEffect(() => {
    const targetLocation = nearbyData?.location || null;
    if (targetLocation) {
      setCenter(targetLocation);
    }
  }, [nearbyData?.location, setCenter]);

  // ==========================================
  // 4. Handlers
  // ==========================================
  const handlePlaceSearch = (params: SearchParams) => {
    setSearchQuery(params.query);
  };

  // ==========================================
  // 5. Render Conditions (Mobile Block)
  // ==========================================
  if (isMobile) {
    return (
      <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-6 text-center bg-slate-50">
        <div className="max-w-md p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <span className="text-4xl">💻</span>
          <h1 className="mt-4 text-xl font-bold text-slate-900">
            데스크톱에 최적화된 페이지입니다
          </h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            죄송합니다. 여행 경로 찾기(지도) 기능은 드래그, 마커 탐색 등 큰
            화면의 UX에 최적화되어 있어 현재 PC 환경에서만 지원하고 있습니다.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white h-11"
          >
            메인 페이지로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  // ==========================================
  // 6. Desktop UI Render
  // ==========================================
  return (
    <main className="h-full w-full flex gap-4 p-4 bg-gray-50">
      {/* 지도 영역 (70%) */}
      <section className="w-[70%] h-full rounded-lg overflow-hidden shadow-xl">
        <Suspense fallback={<MapSkeleton />}>
          <TravelMapWidget
            centerCoords={center}
            places={displayPlaces}
            onMarkerClick={addPlace}
            isLoading={isLoading}
          />
        </Suspense>
      </section>

      {/* 사이드 영역 (30%) */}
      <div className="w-[30%] h-full">
        <PlanningSidebarWidget
          setPlaceSearch={handlePlaceSearch}
          selectedPlaces={selectedPlaces}
          onRemovePlace={removePlace}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </main>
  );
};