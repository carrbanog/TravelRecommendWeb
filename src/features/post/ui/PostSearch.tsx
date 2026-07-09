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
<search className="block">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex items-center">
          <Input
            id="post-search-input"
            type="search"
            placeholder="제목으로 검색..."
            className="w-64 pr-10"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            className="absolute right-0 top-0 h-full px-3 border-none text-sky-600 hover:bg-sky-50 rounded-r-md"
            aria-label="검색 실행"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </search>
  );
};

export default PostSearch;
