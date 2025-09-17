import { useState } from "react";
import TravelMap from "../../features/travel/ui/TravelMap";
import SearchForm from "../../features/travel/ui/SearchForm";

export const TravelPage = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedPlaces, setSelectedPlaces] = useState<
    { name: string; coordinates: [number, number] }[]
  >([]);

  const handleSelectPlace = (place: {
    name: string;
    coordinates: [number, number];
  }) => {
    setSelectedPlaces((prev) => [...prev, place]);
  };
  return (
    <div className="h-screen w-full flex flex-col">
      {/* 상단 헤더 */}

      {/* 본문 (지도 + 검색창) */}
      <main className="flex flex-1 gap-4 p-4">
        {/* 지도 영역 (70%) */}
        <div className="w-[70%] rounded-lg overflow-hidden shadow-md">
          <TravelMap searchTerm={search} onSelectPlace={handleSelectPlace} />
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};
