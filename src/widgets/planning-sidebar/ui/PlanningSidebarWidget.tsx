import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../../../features/search-plcae/ui/SearchForm";
import { TravelDaysPicker } from "../../../features/select-travel-dates/ui/TravelDaysPicker";

import SelectedList from "../../../entities/place/ui/SelectedList";
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import type { SearchParams } from "../../../entities/place/model/type";
import { useDayPickerStore } from "../../../entities/travel-plan/model/useDayPickerStore";

type PlanningSidebarWidgetProps = {
  selectedPlaces: NearPlace[];
  onRemovePlace: (placeId: string) => void;
  setPlaceSearch: (params: SearchParams) => void;
};

export const PlanningSidebarWidget = React.memo(
  ({
    selectedPlaces,
    onRemovePlace,
    setPlaceSearch,
  }: PlanningSidebarWidgetProps) => {
    console.log("PlanningSidebarWidget 렌더링:", { selectedPlaces });
    const tripsDays = useDayPickerStore((state) => state.tripDays);
    const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!selectedPlaces || selectedPlaces.length === 0) {
        e.preventDefault();
        alert("여행지를 하나 이상 선택하세요!");
      } else if (tripsDays === 0) {
        e.preventDefault();
        alert("여행 날짜를 선택하세요!");
      }
    };
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 bg-white shadow-md rounded-2xl overflow-hidden">
        {/* 1번 그룹: 고정 높이 */}
        <div className="flex flex-col gap-4 mb-4">
          <SearchForm setPlaceSearch={setPlaceSearch} />
          <TravelDaysPicker />
        </div>

        {/* 2번 그룹: 핵심 수정 부분! 
          flex-1과 min-h-0을 주어야 자식의 height: 100%가 부모의 남은 공간을 인식합니다. */}
        <div className="flex-1 min-h-0 overflow-hidden mb-4">
          <SelectedList place={selectedPlaces} onRemovePlace={onRemovePlace} />
        </div>

        {/* 3번 그룹: 고정 높이 */}
        <Link
          onClick={handleNextClick}
          to="/travel/path"
          className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
        >
          일정 선택
        </Link>
      </div>
    );
  },
);
