import { useEffect, useState } from "react";
import { LoadScriptNext, Marker } from "@react-google-maps/api";

import SearchForm from "../../features/travel/search-place/ui/SearchForm";
import MyMap from "../../shared/ui/GoogleMap/MyMap";
import SelectedList from "../../entities/selected-place/ui/SelectedList";

import { useGeocodeQuery } from "../../features/travel/search-place/hooks/useGeoCodeQuery";
import { useNearcodeQuery } from "../../features/travel/near-place/hooks/useNearcodeQuery";
import { useSelectedPlacesStore } from "../../entities/selected-place/model/selectedPlacesStore";
import { Link } from "react-router-dom";
import { TravelDaysPicker } from "../../features/travel/travel-date/ui/TravelDaysPicker";

export const TravelPage = () => {
  const [placeSearch, setPlaceSearch] = useState<string>("");

  const { data: coords, isLoading: loadingCoords } =
    useGeocodeQuery(placeSearch); //검색 시 좌표 반환
  const { data: nearPlaces, isLoading: loadingPlaces } =
    useNearcodeQuery(coords); //여행지 검색 시 주변 여행지 출력

  //검색해서 나온 좌료 coords를 통해서 중간값 전역으로 관리

  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces); // 추천여행지에서 선택한 리스트 모음
  const addPlace = useSelectedPlacesStore((s) => s.addPlace); // 마커 클릭시 selectedPlaces에 추가
  const removePlace = useSelectedPlacesStore((s) => s.removePlace); // 제거

  //마지막 위치로 이동
  // const setLastCoords = useSelectedPlacesStore((s) => s.setLastCoords);
  // const lastCoords = useSelectedPlacesStore((s) => s.lastCoords);
  // const mapCenter = lastCoords ?? coords;

  //주변 관광지 추천

  return (
    <div className="h-full w-full flex flex-col">

      {/* 본문 (지도 + 검색창) */}
      <main className="flex flex-1 gap-4 p-5">
        {/* 지도 영역 (70%) - 이 부분은 변경되지 않았습니다. */}
        <div className="w-[70%] rounded-lg overflow-hidden shadow-md">
          {loadingCoords && <div>지도 로딩 중...</div>}
          <LoadScriptNext googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP}>
            <MyMap place={coords}>
              {nearPlaces?.map((placeItem, idx) => (
                <Marker
                  key={idx}
                  position={placeItem.nearCoordinates}
                  onClick={() => addPlace(placeItem)}
                />
              ))}
            </MyMap>
          </LoadScriptNext>
        </div>

        {/* 👇 사이드 영역 (30%) - 이 부분의 구조를 수정했습니다. */}
        <div className="w-[30%] flex flex-col justify-between p-4 bg-white shadow-md rounded-2xl">
          {/* 1번 그룹: 검색 폼 + 날짜 선택기 */}
          <div className="flex flex-col gap-4">
            <SearchForm setPlaceSearch={setPlaceSearch} />
            <TravelDaysPicker />
          </div>

          {/* 2번 그룹: 선택된 장소 목록 (이 부분은 스스로 늘어납니다) */}
          <div className="flex-1 overflow-y-auto my-4">
            <SelectedList place={selectedPlaces} onRemovePlace={removePlace} />
          </div>

          {/* 3번 그룹: 일정 선택 링크 버튼 */}
          <Link
            to="/travel/path"
            className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
          >
            일정 선택
          </Link>
        </div>
      </main>
    </div>
  );
};
