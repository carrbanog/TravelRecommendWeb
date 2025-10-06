import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import { useTravelPlanStore } from "../../../../entities/travel-plan/model/useTravelPlanStore"
export const TravelDaysPicker = () => {
  const { startDate, endDate, setStartDate, setEndDate, setTripDays } = useTravelPlanStore();

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
    console.log(dates)

    if (start && end) {
      const days = differenceInDays(end, start) + 1;
      setTripDays(days);
    } else {
      setTripDays(0);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <label className="font-semibold text-gray-700">여행 기간</label>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        dateFormat="yyyy/MM/dd"
        placeholderText="여행 날짜를 선택하세요"
        className="border rounded px-3 py-2 w-full cursor-pointer"
      />
    </div>
  );
};
