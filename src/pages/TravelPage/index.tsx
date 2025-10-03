import { useState } from "react";
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
  // const [selected, setSelected] = useState<NearPlace>()

  const { data: coords, isLoading: loadingCoords } =
    useGeocodeQuery(placeSearch); //검색 시 좌표 반환
  const { data: nearPlaces, isLoading: loadingPlaces } =
    useNearcodeQuery(coords); //여행지 검색 시 주변 여행지 출력
  // console.log(nearPlaces);

  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const addPlace = useSelectedPlacesStore((s) => s.addPlace);
  const removePlace = useSelectedPlacesStore((s) => s.removePlace);

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
          <SelectedList place={selectedPlaces} onRemovePlace={removePlace} />
          <Link to={"/travel/path"} state={{ places: selectedPlaces }}>
            경로
          </Link>
        </div>
      </main>
    </div>
  );
};
