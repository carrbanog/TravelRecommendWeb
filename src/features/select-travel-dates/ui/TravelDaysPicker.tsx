import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import { useDayPickerStore } from "../../../entities/travel-plan/model/useDayPickerStore"
export const TravelDaysPicker = () => {
  const { startDate, endDate, setStartDate, setEndDate, setTripDays } = useDayPickerStore();

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

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
  <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl shadow-lg p-4">
    {/* Label과 DatePicker를 div로 감싸고 flex-col로 정렬 */}
    <div className="flex flex-col gap-2">
      <label
        htmlFor="travel-dates"
        className="font-semibold text-slate-700"
      >
        여행 기간 📅
      </label>
      <DatePicker
        id="travel-dates" // label과 연결하기 위한 id
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        dateFormat="yyyy/MM/dd"
        placeholderText="여행 날짜를 선택하세요"
        className="w-full cursor-pointer rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-700 placeholder-slate-400 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);
};
