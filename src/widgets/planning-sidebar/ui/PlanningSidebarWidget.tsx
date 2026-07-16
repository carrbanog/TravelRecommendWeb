// 1. External Libraries
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// 2. Features Layer
import SearchForm from "@/features/search-place/ui/SearchForm";
import { TravelDaysPicker } from "@/features/select-travel-dates/ui/TravelDaysPicker";

// 3. Entities Layer
import SelectedList from "@/entities/place/ui/SelectedList";
import { useSelectedPlacesStore } from "@/entities/place/model/selectedPlacesStore"; // 💡 추가: 장소 전역 스토어
import { useDayPickerStore } from "@/entities/travel-plan/model/useDayPickerStore";

// 4. Shared Layer & Types
import type { SearchParams, SearchType } from "@/entities/place/model/type";

type PlanningSidebarWidgetProps = {
  setPlaceSearch: (params: SearchParams) => void;
  activeTab: SearchType;
  setActiveTab: (tab: SearchType) => void;
};

export const PlanningSidebarWidget = React.memo(
  ({ setPlaceSearch, activeTab, setActiveTab }: PlanningSidebarWidgetProps) => {
    const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
    const removePlace = useSelectedPlacesStore((s) => s.removePlace);
    
    const tripsDays = useDayPickerStore((s) => s.tripDays);

    const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!selectedPlaces || selectedPlaces.length === 0) {
        e.preventDefault();
        toast.error("최소 한 곳 이상의 여행지를 선택하세요!");
      } else if (tripsDays === 0) {
        e.preventDefault();
        toast.error("여행 기간을 선택하세요!");
      }
    };

    return (
      <aside className="w-full h-full flex flex-col justify-between p-4 bg-white shadow-md rounded-2xl overflow-hidden">
        {/* 상단: 조건 설정 영역 */}
        <fieldset className="flex flex-col gap-4 mb-4 border-none p-0 m-0">
          <legend className="sr-only">여행지 검색 및 기간 조건 설정</legend>
          <SearchForm
            setPlaceSearch={setPlaceSearch}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TravelDaysPicker />
        </fieldset>

        {/* 중단: 선택된 여행지 리스트 영역 */}
        <div className="flex-1 min-h-0 overflow-hidden mb-4">
          <SelectedList place={selectedPlaces} onRemovePlace={removePlace} />
        </div>

        {/* 하단: 일정 수립 단계 이동 푸터 */}
        <footer>
          <Link
            onClick={handleNextClick}
            to="/travel/path"
            className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
          >
            일정 선택
          </Link>
        </footer>
      </aside>
    );
  }
);

PlanningSidebarWidget.displayName = "PlanningSidebarWidget";