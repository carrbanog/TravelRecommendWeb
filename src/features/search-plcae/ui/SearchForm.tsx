import { useState } from "react";
import type { SearchParams, SearchType } from "../../../entities/place/model/type"

interface SearchFormProps {
  setPlaceSearch: (value: SearchParams) => void;
}

const SearchForm = ({ setPlaceSearch }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchType>("place");

  const handleDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setPlaceSearch({query: trimmed, type: searchType});
    setInputValue("");
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl shadow-lg">
      <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">
        {/* 🔹 검색 타입 버튼 그룹 (폭 고정 + 1:1 분할) */}
        <div className="w-full flex rounded-lg overflow-hidden border border-slate-300 shadow-sm">
          <button
            type="button"
            onClick={() => setSearchType("place")}
            className={`w-1/2 h-11 text-sm font-medium transition-colors duration-200
              ${
                searchType === "place"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
          >
            여행지
          </button>

          <button
            type="button"
            onClick={() => setSearchType("hotel")}
            className={`w-1/2 h-11 text-sm font-medium transition-colors duration-200
              ${
                searchType === "hotel"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
          >
            호텔
          </button>
        </div>

        {/* 🔹 검색 입력 폼 (같은 폭 유지) */}
        <form
          onSubmit={handleDestinationSubmit}
          className="w-full flex items-center border border-slate-300 rounded-lg shadow-sm overflow-hidden"
        >
          <input
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="여행지를 검색해보세요"
            aria-label="여행지 검색"
            className="flex-1 h-11 px-4 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="h-11 px-6 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 flex items-center justify-center"
          >
            검색
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
