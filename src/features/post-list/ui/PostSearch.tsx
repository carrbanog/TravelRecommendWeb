import React from "react";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PostSearchProps {
  onSearch: (keyword: string) => void;
}
const PostSearch = ({ onSearch }: PostSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="제목으로 검색..."
        className="w-64"
        value={inputValue} // 입력 중인 값 표시
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        variant="outline"
        onClick={handleSearch}
        className="border-sky-200 text-sky-600 hover:bg-sky-50"
      >
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default PostSearch;
