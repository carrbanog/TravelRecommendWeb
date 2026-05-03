import { useState } from "react";
import {
  PlaneTakeoff,
  ArrowRightLeft,
  PlaneLanding,
  CalendarIcon,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { CITY_MAP } from "@/shared/constants/airport-codes";

export const FlightSearchForm = () => {
  const [origin, setOrigin] = useState(""); //출발지 상태
  const [destination, setDestination] = useState(""); //도착지 상태
  const [date, setDate] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined,
  }); //날짜 상태

  const handleSearch = () => {
    if (!origin || !destination || !date.from) {
      alert("출발지와 도착지를 모두 입력해주세요.");
      return;
    }
    // 도시 이름을 공항 코드로 변환하는 함수
    const getCode = (city: string) =>
      CITY_MAP[city.trim()] || city.trim().toUpperCase(); //소문자로 입력한 경우  대문자로 수정

    const originCode = getCode(origin);
    const destinationCode = getCode(destination);

    const formatDate = (date: Date) => format(date, "yyMMdd");
    const outboundDate = formatDate(date.from);

    // 왕복인 경우에만 돌아오는 날짜를 포함, 편도인 경우에는 빈 문자열로 처리 
    const inboundDate = date.to ? formatDate(date.to) : "";

    // 스카이스캐너 URL 조합
    const skyscannerUrl = `https://www.skyscanner.co.kr/transport/flights/${originCode}/${destinationCode}/${outboundDate}/${inboundDate}/`;

    window.open(skyscannerUrl, "_blank");
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-4 bg-white p-2 rounded-xl shadow-2xl border border-slate-200">
      <div className="flex flex-col md:flex-row items-center gap-1">
        {/* 출발지 */}
        <div className="relative flex-1 w-full">
          <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="출발지 (예: 서울)"
            className="pl-10 h-14 border focus-visible:ring-0 text-base font-bold text-slate-700"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
        <ArrowRightLeft className="hidden md:block text-slate-300 w-4 h-4 mx-1" />

        {/* 도착지 */}
        <div className="relative flex-1 w-full">
          <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="도착지 (예: 도쿄)"
            className="pl-10 h-14 border focus-visible:ring-0 text-base font-bold text-slate-700"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* 날짜 선택 */}
        <div className="">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={`w-full h-14 justify-start text-left font-bold hover:bg-slate-50 px-3 ${
                  !date.from ? "text-slate-400" : "text-slate-700"
                }`}
              >
                <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" />
                {date?.from ? (
                  date.to ? (
                    <span className="text-sm">
                      {format(date.from, "MM.dd")} - {format(date.to, "MM.dd")}{" "}
                      (왕복)
                    </span>
                  ) : (
                    <span className="text-sm">
                      {format(date.from, "MM.dd")} (편도)
                    </span>
                  )
                ) : (
                  <span className="text-sm">날짜를 선택하세요</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode={"range"}
                defaultMonth={date?.from}
                selected={date}
                onSelect={(range: any) =>
                  setDate(range || { from: undefined, to: undefined })
                }
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button
          onClick={handleSearch}
          className="w-full md:w-auto h-10 px-6 bg-[#0071eb] hover:bg-[#005bbd] text-white font-black rounded-lg flex gap-2"
        >
          <Search className="w-5 h-5" />
          <span>항공권 검색</span>
        </Button>
      </div>
    </div>
  );
};
