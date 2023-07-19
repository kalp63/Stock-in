import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";
import { startOfDay, endOfDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DropdownDatePicker = ({ selectedExpiryDate, onExpiryDateChange }) => {
  const today = new Date();

  const [range, setRange] = useState([
    {
      startDate: startOfDay(today),
      endDate: endOfDay(today),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [tempRange, setTempRange] = useState(range);
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const applyDateRange = () => {
    setRange(tempRange);
    setOpen(false);
    const formattedDate = format(tempRange[0].startDate, "yyyy-MM-dd");
    onExpiryDateChange(formattedDate);
  };

  const cancelDateRange = () => {
    setTempRange(range);
    setOpen(false);
  };

  return (
    <div className="calendarWrap">
      <input
        style={{ height: "31px", textAlign: "center" }}
        value={`${format(range[0].startDate, "dd MMMM yyyy")} `}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />
      <div ref={refOne}>
        {open && (
          <div className="datePickerContainer small">
            <DateRangePicker
              onChange={(item) => setTempRange([item.selection])}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={tempRange}
              months={1}
              direction="horizontal"
              className="calendarElement small"
              minDate={new Date()} // Set minDate to today to restrict past dates only
            />
            <div className="buttonContainer">
              <button onClick={applyDateRange} className="applyButton">
                Apply
              </button>
              <button onClick={cancelDateRange} className="cancelButton">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownDatePicker;
