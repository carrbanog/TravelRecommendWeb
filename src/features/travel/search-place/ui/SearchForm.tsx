import React, { useState } from "react";

export type SearchFormProps = {
  setPlaceSearch: (key: string) => void; //TravelPage에 검색어 전달
};

const SearchForm = ({ setPlaceSearch }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue?.trim(); //공백 방지
    if (!trimmed) return; //빈 문자열 무시
    setPlaceSearch(trimmed);
    setInputValue("");
  };

  return (
    <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl shadow-lg">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <form
          onSubmit={handleDestinationSubmit}
          className="flex items-center space-x-3"
        >
          <input
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="여행지를 검색해보세요"
            aria-label="여행지 검색"
            className="flex-1 px-4 py-2 bg-white text-slate-800 placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium shadow-sm"
          >
            검색
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
