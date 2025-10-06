import { useEffect, useState } from "react";
import { LoadScriptNext, Marker } from "@react-google-maps/api";

import SearchForm from "../../features/travel/search-place/ui/SearchForm";
import MyMap from "../../shared/ui/GoogleMap/MyMap";
import SelectedList from "../../entities/selected-place/ui/SelectedList";

import { useGeocodeQuery } from "../../features/travel/search-place/hooks/useGeoCodeQuery";
import { useNearcodeQuery } from "../../features/travel/near-place/hooks/useNearcodeQuery";
import { useSelectedPlacesStore } from "../../entities/selected-place/model/selectedPlacesStore";
import { Link } from "react-router-dom";

export const TravelPage = () => {
  const [placeSearch, setPlaceSearch] = useState<string>("");
  const [tripDays, setTripDays] = useState(1);

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripDays(Number(e.target.value));
  };

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
    <div className="h-screen w-full flex flex-col">
      {/* 상단 헤더 */}

      {/* 본문 (지도 + 검색창) */}
      <main className="flex flex-1 gap-4 p-4">
        {/* 지도 영역 (70%) */}
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

        {/* 검색창 영역 (30%) */}
        <div className="w-[30%] flex flex-col gap-4">
          <SearchForm setPlaceSearch={setPlaceSearch} />
          <div className="flex flex-col gap-2 mt-2">
            <label>여행 일수</label>
            <input
              type="number"
              min={1}
              value={tripDays}
              onChange={handleDaysChange}
              className="border rounded px-2 py-1"
            />
          </div>
          <SelectedList place={selectedPlaces} onRemovePlace={removePlace} />
          <Link to={"/travel/path"} state={tripDays}>경로 지정</Link>
        </div>
      </main>
    </div>
  );
};
