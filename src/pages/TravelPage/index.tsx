import { useState } from "react";
import TravelMap from "../../features/travel/ui/TravelMap";
import SearchForm from "../../features/travel/ui/SearchForm";

export const TravelPage = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="h-screen w-full flex flex-col">
      {/* 상단 헤더 */}

      {/* 본문 (지도 + 검색창) */}
      <main className="flex flex-1 gap-4 p-4">
        {/* 지도 영역 (70%) */}
        <div className="w-[70%] rounded-lg overflow-hidden shadow-md">
          <TravelMap searchTerm={search} />
        </div>

        {/* 검색창 영역 (30%) */}
        <SearchForm onSearch={setSearch} />
      </main>
    </div>
  );
};
