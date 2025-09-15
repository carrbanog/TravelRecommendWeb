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
    <form onSubmit={destinationHandleSubmit}>
      <input
        type="text"
        placeholder="지역을 입력하세요"
        value={searchDestination}
        onChange={(e) => setSearchDestination(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        확인
      </button>
    </form>
  );
};

export default SearchForm;
