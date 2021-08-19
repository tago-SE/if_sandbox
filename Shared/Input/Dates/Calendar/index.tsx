import React from "react";
import { CalendarHeader } from "./calendarHeader";
import { CalendarDay } from "./calendarDay";

import {
  datesAreOnSameDay,
  createDatesGroupedByWeek,
  firstCalendarDate,
  lastCalendarDate,
  isWithinInterval,
  isWeekend,
  getWeekdays,
  MAX_CALENDAR_DATE,
  MIN_CALENDAR_DATE
} from "./helpers";

interface ICalendarProps {
  selected?: Date;
  minDate?: Date;
  maxDate?: Date;
  startDate?: Date;
  endDate?: Date;
  /** Reverse the start and end dates (only changes the styling) */
  reverse?: boolean;
  events?: {
    onDateSelection: (date: Date) => void;
  };
}

export function Calendar({ selected, startDate, minDate, maxDate, endDate, reverse = false, events }: ICalendarProps) {
  const _today = new Date();
  const _cursor = selected || _today;
  const _minDate = minDate || MIN_CALENDAR_DATE;
  const _maxDate = maxDate || MAX_CALENDAR_DATE;

  const [state, setState] = React.useState({
    selected: selected,
    datesByWeek: createDatesGroupedByWeek(firstCalendarDate(_cursor), lastCalendarDate(_cursor)),
    cursor: _cursor
  });

  const onNextMonth = (nextDate: Date) => {
    setState((prevState) => ({
      ...prevState,
      datesByWeek: createDatesGroupedByWeek(firstCalendarDate(nextDate), lastCalendarDate(nextDate)),
      cursor: nextDate
    }));
  };

  const onPrevMonth = (prevDate: Date) => {
    setState((prevState) => ({
      ...prevState,
      datesByWeek: createDatesGroupedByWeek(firstCalendarDate(prevDate), lastCalendarDate(prevDate)),
      cursor: prevDate
    }));
  };

  const handleDatePicked = (date: Date) => {
    if (state.selected === date) return;
    if (events?.onDateSelection) events.onDateSelection(date);
    setState((prevState) => ({ ...prevState, selected: date }));
  };

  // React.useEffect(() => {
  //   if (selected?.getTime() == state.selected?.getTime()) return;
  //   let cursor = selected || new Date();
  //   setState((prevState) => ({ ...prevState,
  //     datesByWeek: createDatesGroupedByWeek(firstCalendarDate(cursor), lastCalendarDate(cursor)),
  //     cursor: cursor,
  //   }));
  // }, [selected]);

  return (
    <div
      aria-label="Calendar view date-picker"
      className="if datepicker"
      role="application"
      style={{
        position: "relative",
        top: "0px",
        left: "0px",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        display: "block",
        border: "none",
        boxShadow: "none"
      }}
    >
      <CalendarHeader
        currentDate={state.cursor}
        minDate={_minDate}
        maxDate={_maxDate}
        onNext={onNextMonth}
        onPrev={onPrevMonth}
      />
      <table className="if calendar" role="grid">
        <thead className="if" role="rowgroup">
          <tr className="if" role="row">
            {getWeekdays().map((weekday: string, index: number) => (
              <th key={index} className="if weekend" scope="col" role="columnhead" aria-label={weekday}>
                <span title={weekday}>{weekday.substr(0, 2)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="if" role="rowgroup">
          {state.datesByWeek.map((weekDates: any, rowIndex: number) => {
            return (
              <tr className="if" key={rowIndex} role="row">
                {weekDates.map((date: Date, columnIndex: number) => {
                  const notSelectable = !isWithinInterval(date, _minDate, _maxDate);
                  const style: React.CSSProperties = {
                    pointerEvents: notSelectable ? "none" : undefined
                  };
                  return (
                    <CalendarDay
                      role="gridcell"
                      key={columnIndex + rowIndex * 7}
                      data-row={rowIndex}
                      data-column={columnIndex}
                      date={date}
                      style={style}
                      notSelectable={notSelectable}
                      active={datesAreOnSameDay(state.selected, date)}
                      start={datesAreOnSameDay(reverse ? endDate : startDate, date)}
                      end={datesAreOnSameDay(reverse ? startDate : endDate, date)}
                      inRange={isWithinInterval(date, startDate, endDate)}
                      today={datesAreOnSameDay(_today, date)}
                      weekend={isWeekend(date)}
                      onClick={() => {
                        if (notSelectable) return;
                        handleDatePicked(date);
                      }}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
