import { useState } from "react";
import { LoadScript, LoadScriptNext } from '@react-google-maps/api';

import SearchForm from "../../features/travel/search-place/ui/SearchForm";
import MyMap from "../../shared/ui/GoogleMap/MyMap";
import SelectedList from '../../entities/selected-place/ui/SelectedList';

import { useGeocodeQuery } from "../../features/travel/search-place/hooks/useGeoCodeQuery";
import { useNearcodeQuery } from "../../features/travel/near-place/hooks/useNearcodeQuery";
import { useSelectedPlacesStore } from '../../entities/selected-place/model/selectedPlacesStore';

export const TravelPage = () => {
  const [placeSearch, setPlaceSearch] = useState<string>("");
  // const [selected, setSelected] = useState<NearPlace>()

  const { data: coords, isLoading: loadingCoords } = useGeocodeQuery(placeSearch); //검색 시 좌표 반환
  const { data: nearPlaces, isLoading: loadingPlaces } = useNearcodeQuery(coords); //여행지 검색 시 주변 여행지 출력
  // console.log(nearPlaces);

  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const addPlace = useSelectedPlacesStore((s) => s.addPlace);
  // const removePlace = useSelectedPlacesStore((s) => s.removePlace);

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
            <MyMap place={coords} nearPlaces={nearPlaces} onAddPlace={addPlace} />
          </LoadScriptNext>
          
        </div>

        {/* 검색창 영역 (30%) */}
        <div className="w-[30%] flex flex-col gap-4">
          <SearchForm setPlaceSearch={setPlaceSearch} />
          <SelectedList place={selectedPlaces}/>
        </div>
      </main>
    </div>
  );
};
