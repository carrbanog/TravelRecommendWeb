import React, { useState } from "react";

export type SearchFormProps = {
  onSearch: (query: string) => void;
};

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [searchDestination, setSearchDestination] = useState<string>("");
  const destinationHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchDestination.trim() !== "") {
      onSearch(searchDestination);
    }
  };
  return (
    <form onSubmit={destinationHandleSubmit} className="grid grid-cols-10 mb-4">
      {/* 검색 입력창 (90%) */}
      <input
        type="text"
        placeholder="지역을 입력하세요"
        value={searchDestination}
        onChange={(e) => setSearchDestination(e.target.value)}
        className="col-span-9 border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* 확인 버튼 (10%) */}
      <button
        type="submit"
        className="col-span-1 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors"
      >
        확인
      </button>
    </form>
  );
};

export default SearchForm;
