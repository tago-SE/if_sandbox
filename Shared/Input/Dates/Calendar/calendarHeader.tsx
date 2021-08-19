import React from "react";
import {
  getPreviousMonth,
  firstCalendarDate,
  lastDayOfMonth,
  firstDayOfMonth,
  yesterday,
  tomorrow,
  getNextMonth,
  getMonthName,
  throwOnInvalidMonth
} from "./helpers";
import { nextButton } from "./calendar.module.scss";

interface IArrowButtonProps {
  variant: "previous" | "next";
  children?: any;
  [x: string]: any;
}

const titleColor = "#0054f0";

export function ArrowButton({ variant, children, ...props }: IArrowButtonProps) {
  return (
    <button className={`if ${variant} ${nextButton}`} type="button" {...props}>
      {children}
    </button>
  );
}

export interface ICalendarHeaderProps {
  /** Any date on the calendar month that is being displayed */
  currentDate: Date;
  minDate?: Date;
  maxDate?: Date;
  onPrev: (prev: Date) => void;
  onNext: (next: Date) => void;
}

export const CalendarHeader = ({ currentDate, minDate, maxDate, onPrev, onNext }: ICalendarHeaderProps) => {
  const prevDate = yesterday(firstDayOfMonth(currentDate));
  const nextDate = tomorrow(lastDayOfMonth(currentDate));
  const prev = { year: prevDate.getFullYear(), month: prevDate.getMonth() };
  const next = { year: nextDate.getFullYear(), month: nextDate.getMonth() };
  const curr = { year: currentDate.getFullYear(), month: currentDate.getMonth() };
  const hidePrev = minDate && minDate > prevDate;
  const hideNext = maxDate && maxDate < nextDate;
  return (
    <div className="if header" style={{ marginBottom: "1rem" }}>
      <ArrowButton
        hidden={hidePrev}
        variant="previous"
        onClick={() => onPrev(prevDate)}
        aria-hidden={hidePrev}
        aria-label="Previous month"
      >
        <span className="if axe sr-only">
          Previous Month, {getMonthName(prev.month)} {prev.year}
        </span>
      </ArrowButton>
      <div className="if title" style={{ color: titleColor }}>
        <span className="if month">{getMonthName(curr.month)}</span>&nbsp;<span className="if year">{curr.year}</span>
      </div>
      <ArrowButton
        hidden={hideNext}
        variant="next"
        onClick={() => onNext(nextDate)}
        aria-hidden={hideNext}
        aria-label="Next month"
      >
        <span className="if axe sr-only">
          Next Month, {getMonthName(next.month)} {next.year}
        </span>
      </ArrowButton>
    </div>
  );
};
