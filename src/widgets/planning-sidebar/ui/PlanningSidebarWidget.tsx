import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../../../features/search-plcae/ui/SearchForm";
import { TravelDaysPicker } from "../../../features/select-travel-dates/ui/TravelDaysPicker";

import SelectedList from "../../../entities/selected-place/ui/SelectedList";
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import type { SearchParams } from "../../../entities/place/model/type";

type Props = {
  selectedPlaces: NearPlace[];
  onRemovePlace: (placeId: string) => void;
  setPlaceSearch: (params: SearchParams) => void;
};

export const PlanningSidebarWidget = ({
  selectedPlaces,
  onRemovePlace,
  setPlaceSearch,
}: Props) => {
  const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!selectedPlaces || selectedPlaces.length === 0) {
      e.preventDefault();
      alert("여행지를 하나 이상 선택하세요!");
    }
  };
  return (
    <div className="w-[30%] flex flex-col justify-between p-4 bg-white shadow-md rounded-2xl">
      {/* 1번 그룹: 검색 폼 + 날짜 선택기 */}
      <div className="flex flex-col gap-4">
        <SearchForm setPlaceSearch={setPlaceSearch} />
        <TravelDaysPicker />
      </div>

      {/* 2번 그룹: 선택된 장소 목록 (이 부분은 스스로 늘어납니다) */}
      <div className="flex-1 overflow-y-auto my-4">
        <SelectedList place={selectedPlaces} onRemovePlace={onRemovePlace} />
      </div>

      {/* 3번 그룹: 일정 선택 링크 버튼 */}
      <Link
        onClick={handleNextClick}
        to="/travel/path"
        className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
      >
        일정 선택
      </Link>
    </div>
  );
};
