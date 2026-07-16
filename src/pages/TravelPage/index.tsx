// [Widgets Layer]
import { lazy, Suspense } from "react";
import { PlanningSidebarWidget } from "@/widgets/planning-sidebar/ui/PlanningSidebarWidget";

// [Shared & Local Hooks/UI]
import { useTravelPageState } from "./lib/useTravelPageState";
import { useMediaQuery } from "@/shared/lib/hooks/useMediaQuery";
import { MobileBlockGuard } from "./MobileBlockGuard";
import { MapSkeleton } from "@/shared/ui/GoogleMap/MapSkeleton";

const TravelMapWidget = lazy(
  () => import("@/widgets/travel-map/ui/TravelMapWidget"),
);

export const TravelPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    activeTab,
    setActiveTab,
    displayPlaces,
    isLoading,
    handlePlaceSearch,
  } = useTravelPageState();

  if (isMobile) {
    return <MobileBlockGuard />;
  }

  return (
    <main className="h-full w-full flex gap-4 p-4 bg-gray-50">
      {/* 지도 영역 (70%) */}
      <section className="w-[70%] h-full rounded-lg overflow-hidden shadow-xl">
        <Suspense fallback={<MapSkeleton />}>
          <TravelMapWidget places={displayPlaces} isLoading={isLoading} />
        </Suspense>
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
