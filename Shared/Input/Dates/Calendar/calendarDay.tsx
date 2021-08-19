export interface IDayProps {
  date: Date;
  today?: boolean;
  active?: boolean;
  start?: boolean;
  inRange?: boolean;
  weekend?: boolean;
  end?: boolean;
  notSelectable?: boolean;
  [x: string]: any;
}

export function CalendarDay({ date, today, active, notSelectable, start, end, inRange, weekend, ...props }: IDayProps) {
  const getClasses = () => {
    return (
      "if" +
      (weekend ? " weekend" : "") +
      (today ? " today" : "") +
      ((active || inRange) && !end && !start ? " is-active" : "") +
      (notSelectable ? " non-selectable-day" : "") +
      (start ? " is-selected-start" : "") +
      (end ? " is-selected-end" : "")
    );
  };
  return (
    <td
      aria-label={date.toString()}
      className={getClasses()}
      data-month={date.getMonth() + 1}
      data-year={date.getFullYear()}
      role="button"
      tabIndex={notSelectable ? -1 : 0}
      data-day={date.getDate()}
      {...props}
    />
  );
}
