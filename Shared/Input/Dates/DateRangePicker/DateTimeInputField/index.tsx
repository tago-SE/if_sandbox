/**
 * Min and Max date limits has not been implemented.
 */
import React from "react";
import { format, isValid } from "date-fns";
import * as styles from "./datetime-inputfield.module.scss";
// import { ITime } from "../../TimePicker/timePicker";

interface IDateTimeInputFieldProps {
  startDate: Date;
  // minDate?: Date;
  // maxDate?: Date;
  onDateChanged?: (date: Date) => void;
  onDateFieldClicked?: () => void;
  onTimeFieldClicked?: () => void;
}

export function DateTimeInputField({
  startDate,
  // minDate,
  // maxDate,
  onDateChanged,
  onDateFieldClicked,
  onTimeFieldClicked
}: IDateTimeInputFieldProps) {
  const dateRef = React.useRef(null);
  const timeRef = React.useRef(null);

  const isValidDate = (d: Date) => {
    return d instanceof Date && !isNaN(d.getTime());
  };

  const handleDateTimeChange = () => {
    const combinedValue = String(dateRef.current.value) + "T" + String(timeRef.current.value);
    const date = new Date(combinedValue);
    console.log("HANDLE DATE TIME CHANGE", combinedValue);
    if (onDateChanged) onDateChanged(isValidDate(date) ? date : null);
  };

  React.useEffect(() => {
    if (startDate) {
      dateRef.current.value = format(startDate, "yyyy-MM-dd");
      timeRef.current.value = format(startDate, "HH:mm");
    } else {
      console.log("not sure what to do with startDate if set to undefined... May lead to circular logic");
    }
  }, [startDate]);

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          placeholder="YYYY-MM-DD"
          type="date"
          ref={dateRef}
          onChange={(event) => {
            if (!event.target.value) return;
            handleDateTimeChange();
          }}
          onClick={onDateFieldClicked ? () => onDateFieldClicked() : undefined}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          placeholder="YYYY-MM-DD"
          type="time"
          ref={timeRef}
          onChange={(event) => {
            if (!event.target.value) return;
            handleDateTimeChange();
          }}
          onClick={onTimeFieldClicked ? () => onTimeFieldClicked() : undefined}
        />
      </div>
    </>
  );
}
