// 1. External Libraries & Icons (외부 라이브러리, 날짜 유틸, 아이콘)
import { useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { toast } from "sonner";
import {
  PlaneTakeoff,
  ArrowRightLeft,
  PlaneLanding,
  CalendarIcon,
  Search,
} from "lucide-react";

// 2. Global Components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";

// 3. Shared Layer (프로젝트 공통 상수)
import { CITY_MAP } from "@/shared/constants/airport-codes";

// ... 상단 import 생략 ...

export const FlightSearchForm = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined,
  });
const handleSearchDirectly = () => {
    // 1. 배포 환경에서 함수가 실행되는지 확인하는 가장 확실한 방법
    alert("1. 클릭 이벤트 진입 성공");

    try {
      // 2. 외부 변수나 함수를 거치지 않고 가장 단순한 주소로 먼저 이동 시도
      const testUrl = "https://www.skyscanner.co.kr";
      
      alert("2. 이동 시도 주소: " + testUrl);
      
      // _self 이동의 가장 원초적인 방법
      window.location.href = testUrl;
    } catch (error) {
      // 혹시나 잡히지 않는 에러가 있다면 alert로 강제 출력
      alert("에러 발생: " + String(error));
    }
  };

const handleSearch = () => {
  // 1. 데이터 방어 체크
  if (!origin || !destination || !date || !date.from) {
    toast.error("출발지, 도착지, 날짜를 모두 선택해 주세요", { position: "top-right" });
    return;
  }

  // 2. 도시 코드로 변환
  const getCode = (city: string) => {
    const trimmed = city.trim();
    return CITY_MAP[trimmed] || trimmed.toUpperCase();
  };

  const originCode = getCode(origin);
  const destinationCode = getCode(destination);

  // 3. [핵심] date-fns 대신 순수 JS로 'yyMMdd' 포맷팅 구현 (배포 환경에서 100% 안전)
  const formatToYYMMDD = (targetDate: Date) => {
    const yy = String(targetDate.getFullYear()).slice(-2); // 2026 -> "26"
    const mm = String(targetDate.getMonth() + 1).padStart(2, "0"); // 7 -> "07"
    const dd = String(targetDate.getDate()).padStart(2, "0");
    return `${yy}${mm}${dd}`;
  };

  let outboundDate = "";
  let inboundDate = "";

  try {
    outboundDate = formatToYYMMDD(date.from);
    inboundDate = date.to ? formatToYYMMDD(date.to) : "";
  } catch (error) {
    // 혹시나 날짜 객체 자체가 꼬였을 경우를 대비한 안전장치
    alert("날짜 계산 중 오류가 발생했습니다. 다시 선택해 주세요.");
    return;
  }

  // 4. 스카이스캐너 URL 조합
  const skyscannerUrl = `https://www.skyscanner.co.kr/transport/flights/${originCode}/${destinationCode}/${outboundDate}/${inboundDate}/`;

  // 5. handleSearchDirectly에서 검증된 가장 확실한 이동 방식 사용
  window.location.href = skyscannerUrl;
};
  return (
    <search className="w-full max-w-6xl mx-auto my-4 bg-white p-2 rounded-xl shadow-2xl border border-slate-200">
      {/* 1. form 태그를 div로 변경 (onSubmit 제거) */}
      <div className="flex flex-col md:flex-row items-center gap-1">
        <fieldset className="flex-1 w-full flex flex-col md:flex-row items-center gap-1 border-none p-0 m-0">
          <legend className="sr-only">항공권 일정 및 목적지 검색</legend>

          <div className="relative flex-1 w-full">
            <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              id="origin"
              placeholder="출발지 (예: 서울)"
              className="pl-10 h-14 border focus-visible:ring-0 text-base font-bold text-slate-700"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>

          <ArrowRightLeft
            className="hidden md:block text-slate-300 w-4 h-4 mx-1"
            aria-hidden="true"
          />

          <div className="relative flex-1 w-full">
            <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              id="destination"
              placeholder="도착지 (예: 도쿄)"
              className="pl-10 h-14 border focus-visible:ring-0 text-base font-bold text-slate-700"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="w-full md:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className={`w-full h-14 justify-start text-left font-bold hover:bg-slate-50 px-3 ${
                    !date.from ? "text-slate-400" : "text-slate-700"
                  }`}
                  aria-label="여행 날짜 선택"
                >
                  <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" />
                  {date?.from ? (
                    date.to ? (
                      <span className="text-sm">
                        {format(date.from, "MM.dd")} -{" "}
                        {format(date.to, "MM.dd")} (왕복)
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
                  mode="range"
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
        </fieldset>

        {/* 2. type="submit" 대신 type="button"과 onClick 이벤트 부여 */}
        <Button
          type="button"
          onClick={handleSearch}
          className="w-full md:w-auto h-14 px-6 bg-[#0071eb] hover:bg-[#005bbd] text-white font-black rounded-lg flex gap-2 shrink-0"
        >
          <Search className="w-5 h-5" />
          <span>항공권 검색</span>
        </Button>
      </div>
      <Button
          type="button"
          onClick={handleSearchDirectly} // 임시 다이어트 함수 바인딩
          className="w-full md:w-auto h-14 px-6 bg-[#0071eb] text-white font-black rounded-lg shrink-0"
        >
          <span>항공권 검색 테스트</span>
        </Button>
    </search>
  );
};
