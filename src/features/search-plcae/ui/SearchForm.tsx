import React, { useState } from "react";
import type {
  SearchParams,
  SearchType,
} from "../../../entities/place/model/type";
import { Search, MapPin, Hotel } from "lucide-react";

// shadcn 컴포넌트 임포트
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface SearchFormProps {
  setPlaceSearch: (value: SearchParams) => void;
}

const SearchForm = React.memo(({ setPlaceSearch }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchType>("place");

  const handleDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setPlaceSearch({ query: trimmed, type: searchType });
    setInputValue("");
  };

  return (
    <Card className="p-4 border-none shadow-md bg-white/80 backdrop-blur-sm">
      <div className="space-y-4">
        {/* 🔹 검색 타입 선택 (Tabs 활용) */}
        <Tabs
          defaultValue="place"
          value={searchType}
          onValueChange={(value) => setSearchType(value as SearchType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 h-11">
            <TabsTrigger value="place" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              여행지
            </TabsTrigger>
            <TabsTrigger value="hotel" className="flex items-center gap-2">
              <Hotel className="w-4 h-4" />
              호텔
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 🔹 검색 입력 폼 */}
        <form
          onSubmit={handleDestinationSubmit}
          className="relative flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                searchType === "place"
                  ? "어디로 떠나고 싶으신가요?"
                  : "머무실 호텔을 입력하세요"
              }
              className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-blue-500 focus-visible:ring-blue-500 transition-all"
            />
          </div>
          <Button
            type="submit"
            className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            검색
          </Button>
        </form>
      </div>
    </Card>
  );
});

SearchForm.displayName = "SearchForm";

export default SearchForm;
