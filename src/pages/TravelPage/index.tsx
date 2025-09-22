import { useEffect, useState } from "react";
import TravelMap from "../../features/travel/ui/TravelMap";
import SearchForm from "../../features/travel/ui/SearchForm";
import { useSelectedPlace } from "../../features/travel/model/useSelectedPlace";

export const TravelPage = () => {
  const { selectedPlaces, addPlace, removePlace } = useSelectedPlace();

  const [search, setSearch] = useState<string>("");

  return (
    <div className="h-screen w-full flex flex-col">
      {/* 상단 헤더 */}

      {/* 본문 (지도 + 검색창) */}
      <main className="flex flex-1 gap-4 p-4">
        {/* 지도 영역 (70%) */}
        <div className="w-[70%] rounded-lg overflow-hidden shadow-md">
          <TravelMap
            searchTerm={search}
            onSelectPlace={addPlace}
            selectedPlace={selectedPlaces}
          />
        </div>

        {/* 검색창 영역 (30%) */}
        <div className="w-[30%] flex flex-col gap-4">
          <SearchForm onSearch={setSearch} />

          {/* ✅ 선택된 장소 리스트 */}
          <div className="p-2 border rounded-md shadow-sm bg-white">
            <h3 className="font-bold mb-2">선택된 장소</h3>
            <ul className="list-disc pl-5">
              {selectedPlaces.map((place, idx) => (
                <li key={idx}>
                  {place.name}: {place.coordinates[0]}, {place.coordinates[1]}
                  <button
                    onClick={() => removePlace(idx)}
                    className="ml-2 inline-flex h-6 w-6 items-center justify-center bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                    aria-label="선택한 장소 삭제"
                    title="삭제"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};
