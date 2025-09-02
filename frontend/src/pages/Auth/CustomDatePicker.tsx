import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import calender from "../../assets/calender.svg";

interface CustomDatePickerProps {
  label: string;
  onDateChange: (date: string) => void;
}

const CustomInput = forwardRef<
  HTMLInputElement,
  { value?: string; onClick?: () => void; label: string }
>(({ value, onClick, label }, ref) => {
  const hasValue = Boolean(value);

  return (
    <div className="relative w-full">
      <input
        id="dob"
        ref={ref}
        value={value}
        onClick={onClick}
        readOnly
        placeholder=" "
        className="peer block w-full h-[52px] px-4 pl-12 text-gray-700 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer md:h-[59px]"
      />
      <label
        htmlFor="dob"
        className={`absolute bg-white left-4 text-gray-500 transform transition-all
          ${
            hasValue
              ? "top-0 left-4 -translate-y-1/2 text-base"
              : "top-1/2 left-4 -translate-y-1/2 text-base"
          }
          peer-focus:top-0 peer-focus:left-4 peer-focus:-translate-y-1/2 peer-focus:text-base peer-focus:text-blue-500`}
      >
        {label}
      </label>

      {hasValue && (
        <button
          type="button"
          onClick={onClick}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
        >
          <img src={calender} alt="calendar" />
        </button>
      )}
    </div>
  );
});

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
