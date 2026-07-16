import { useState, useEffect, useMemo } from "react";

// [Features & Entities Layer]
import { useNearbyPlacesQuery } from "@/features/find-nearby-places/lib/useNearByPlacesQuery";
import { useSelectedPlacesStore } from "@/entities/place/model/selectedPlacesStore";
import type { SearchParams, SearchType } from "@/entities/place/model/type";

// [Widgets Layer]
import { PlanningSidebarWidget } from "@/widgets/planning-sidebar/ui/PlanningSidebarWidget";
import { TravelMapWidget } from "@/widgets/travel-map/ui/TravelMapWidget";
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";
import { MobileBlockGuard } from "./MobileBlockGuard";

export const TravelPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<SearchType>("place");

  const rememberedData = useSelectedPlacesStore((s) => s.rememberedData);
  const setRememberedData = useSelectedPlacesStore((s) => s.setRememberedData);

  const { data: nearbyData, isLoading } = useNearbyPlacesQuery({
    query: searchQuery,
  });
  const currentData = nearbyData || rememberedData;

  const displayPlaces = useMemo(() => {
    if (activeTab === "place") return currentData?.places || [];
    if (activeTab === "hotel") return currentData?.hotels || [];
    return [];
  }, [activeTab, currentData]);

  // 쿼리 결과 스토어 백업
  useEffect(() => {
    if (nearbyData) {
      setRememberedData(nearbyData);
    }
  }, [nearbyData, setRememberedData]);

  const handlePlaceSearch = (params: SearchParams) => {
    setSearchQuery(params.query);
  };

  if (isMobile) {
    return <MobileBlockGuard />;
  }

  return (
    <main className="h-full w-full flex gap-4 p-4 bg-gray-50">
      {/* 지도 영역 (70%) */}
      <section className="w-[70%] h-full rounded-lg overflow-hidden shadow-xl">
        <TravelMapWidget
          places={displayPlaces}
          isLoading={isLoading}
        />
      </section>

      {/* 사이드 영역 (30%) */}
      <div className="w-[30%] h-full">
        <PlanningSidebarWidget
          setPlaceSearch={handlePlaceSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </main>
  );
};
