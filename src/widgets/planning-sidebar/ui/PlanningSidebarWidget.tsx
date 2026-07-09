// 1. External Libraries (외부 라이브러리 및 React)
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// 2. Features Layer (사용자 상호작용 및 기능 단위)
import SearchForm from "@/features/search-plcae/ui/SearchForm"; // 💡 오타 수정: plcae -> place
import { TravelDaysPicker } from "@/features/select-travel-dates/ui/TravelDaysPicker";

// 3. Entities Layer (비즈니스 도메인 및 데이터 상태 관리)
import SelectedList from "@/entities/place/ui/SelectedList";
import { useDayPickerStore } from "@/entities/travel-plan/model/useDayPickerStore";

// 4. Shared Layer - Types (가장 하위 공통 데이터 타입)
import type { SearchParams, SearchType } from "@/entities/place/model/type";
import type { NearPlace } from "@/shared/types/nearPlaceType";

type PlanningSidebarWidgetProps = {
  setPlaceSearch: (params: SearchParams) => void;
  selectedPlaces: NearPlace[];
  onRemovePlace: (placeId: string) => void;
  activeTab: SearchType; // 선택한 탭을 부모에게 전달하는 상태
  setActiveTab: (tab: SearchType) => void; // 선택한 탭을 부모에게 전달하는 함수
};

export const PlanningSidebarWidget = React.memo(
  ({
    selectedPlaces,
    onRemovePlace,
    setPlaceSearch,
    setActiveTab,
    activeTab,
  }: PlanningSidebarWidgetProps) => {
    const tripsDays = useDayPickerStore((state) => state.tripDays);
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
        <fieldset className="flex flex-col gap-4 mb-4 border-none p-0 m-0">
          <legend className="sr-only">여행지 검색 및 기간 조건 설정</legend>
          <SearchForm
            setPlaceSearch={setPlaceSearch}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TravelDaysPicker />
        </fieldset>

        <div className="flex-1 min-h-0 overflow-hidden mb-4">
          <SelectedList place={selectedPlaces} onRemovePlace={onRemovePlace} />
        </div>

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
  },
);
