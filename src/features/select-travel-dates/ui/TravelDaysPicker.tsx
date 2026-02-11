import { format, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale"; // 한국어 설정
import { Calendar as CalendarIcon, CalendarRange } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useDayPickerStore } from "../../../entities/travel-plan/model/useDayPickerStore";

// shadcn ui
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const TravelDaysPicker = () => {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setTripDays,
    tripDays,
  } = useDayPickerStore();

  // shadcn Calendar는 { from: Date, to: Date } 객체 형태를 사용합니다.
  const dateRange: DateRange | undefined = {
    from: startDate || undefined,
    to: endDate || undefined,
  };

  const handleSelect = (range: DateRange | undefined) => {
    const start = range?.from || null;
    const end = range?.to || null;

    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const days = differenceInDays(end, start) + 1;
      setTripDays(days);
    } else {
      setTripDays(0);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-slate-100 p-4 transition-all hover:shadow-lg">
      <div className="flex flex-col gap-3">
        {/* 헤더 부분 */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-bold text-slate-700 text-sm">
            <CalendarRange className="w-4 h-4 text-blue-600" />
            여행 기간
          </label>
          {tripDays > 0 && (
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {tripDays}일간의 여정
            </span>
          )}
        </div>

        {/* Popover + Calendar 결합 */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full h-11 justify-start text-left font-normal border-slate-200 hover:bg-slate-50 transition-all",
                !startDate && "text-slate-400",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
              {startDate ? (
                endDate ? (
                  <>
                    {format(startDate, "M월 d일", { locale: ko })} -{" "}
                    {format(endDate, "M월 d일", { locale: ko })}
                  </>
                ) : (
                  format(startDate, "M월 d일", { locale: ko })
                )
              ) : (
                <span>여행 날짜를 선택하세요</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              defaultMonth={startDate || new Date()}
              selected={dateRange}
              onSelect={handleSelect}
              numberOfMonths={2} // 두 달씩 보여주면 훨씬 전문적입니다
              locale={ko}
              className="rounded-md border shadow-md bg-white"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
