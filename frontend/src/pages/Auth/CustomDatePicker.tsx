import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 11h14M7 15h10M7 19h10"
    />
  </svg>
);

interface CustomDatePickerProps {
  label: string;
  onDateChange: (date: string) => void;
}

const CustomInput = forwardRef<
  HTMLInputElement,
  { value?: string; onClick?: () => void; label: string }
>(({ value, onClick, label }, ref) => (
  <div className="relative w-full">
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      readOnly
      placeholder=" "
      className="block w-full h-[52px] px-4 pl-12 text-gray-700 bg-white border border-gray-300 rounded-lg outline-none peer focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer md:h-[59px]"
    />
    <label className="absolute left-12 px-1 text-gray-500 bg-white transform -translate-y-1/2 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-12 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-12 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-blue-500">
      {label}
    </label>
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      <CalendarIcon />
    </div>
  </div>
));

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, "d MMMM yyyy");
      onDateChange(formattedDate);
    } else {
      onDateChange("");
    }
  };

  return (
    <div className="w-full">
      <DatePicker
        wrapperClassName="w-full"
        calendarClassName="z-50"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="d MMMM yyyy"
        customInput={<CustomInput label={label} />}
        popperPlacement="bottom-start"
        portalId="root-portal"
      />
    </div>
  );
};

export default CustomDatePicker;
