import { useState } from "react";

import SearchForm from "../../features/travel/search-place/ui/SearchForm";
import MyMap from "../../shared/ui/GoogleMap/MyMap";
import NearbyPlacesList from "../../features/travel/near-place/ui/NearbyPlacesList";

import { useGeocodeQuery } from "../../features/travel/search-place/hooks/useGeoCodeQuery";
import { useNearcodeQuery } from "../../features/travel/near-place/hooks/useNearcodeQuery";

export const TravelPage = () => {
  const [placeSearch, setPlaceSearch] = useState<string>("");

  const { data: coords, isLoading } = useGeocodeQuery(placeSearch); //검색 시 좌표 반환

  const { data: nearPlaces } = useNearcodeQuery(coords); //여행지 검색 시 주변 여행지 출력
  // console.log(nearPlaces);

  //주변 관광지 추천

  return (
    <div className="h-screen w-full flex flex-col">
      {/* 상단 헤더 */}

      {/* 본문 (지도 + 검색창) */}
      <main className="flex flex-1 gap-4 p-4">
        {/* 지도 영역 (70%) */}
        <div className="w-[70%] rounded-lg overflow-hidden shadow-md">
          {isLoading && <div>지도 로딩 중...</div>}
          <MyMap place={coords} nearPlaces={nearPlaces} />
        </div>

        {/* 검색창 영역 (30%) */}
        <div className="w-[30%] flex flex-col gap-4">
          <SearchForm setPlaceSearch={setPlaceSearch} />
        </div>

        <div>
          <NearbyPlacesList places={nearPlaces} />
        </div>
      </main>
    </div>
  );
};
