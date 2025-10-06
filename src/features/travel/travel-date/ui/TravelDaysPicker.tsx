import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";

type TravelDaysPickerProps = {
  setTripsDays: (days: number) => void;
};

export const TravelDaysPicker = ({ setTripsDays }: TravelDaysPickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const days = differenceInDays(end, start) + 1;
      setTripsDays(days);
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
      {startDate && endDate && (
        <p className="text-sm text-gray-600">
          여행일수: {differenceInDays(endDate, startDate) + 1}일
        </p>
      )}
    </div>
  );
};
