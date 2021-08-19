import * as dateFns from "date-fns";

const startOnSunday = false;
const weekStartsOn = startOnSunday ? 0 : 1;

// Week days names and shortnames
const firstDOW = dateFns.startOfWeek(new Date(), { weekStartsOn: weekStartsOn });
export const WEEK_DAYS = Array.from(Array(7)).map((_, i) => dateFns.format(dateFns.addDays(firstDOW, i), "EEEE"));

export const getWeekdays = (numLetters?: number) => {
  if (numLetters) return WEEK_DAYS.map((s) => s.substr(0, numLetters));
  return WEEK_DAYS;
};

interface IMonth {
  shortName: string;
  fullName: string;
}

export const MONTHS: Array<IMonth> = [
  { shortName: "Jan", fullName: "January" },
  { shortName: "Feb", fullName: "February" },
  { shortName: "Mar", fullName: "March" },
  { shortName: "Apr", fullName: "April" },
  { shortName: "May", fullName: "May" },
  { shortName: "Jun", fullName: "June" },
  { shortName: "Jul", fullName: "July" },
  { shortName: "Aug", fullName: "August" },
  { shortName: "Sep", fullName: "September" },
  { shortName: "Oct", fullName: "October" },
  { shortName: "Nov", fullName: "November" },
  { shortName: "Dec", fullName: "December" }
];

export const throwOnInvalidMonth = (month: number) => {
  if (month < 0 || month > 11) throw new Error(`Month is out of bounds: ${month}`);
};

/**
 *
 * @param month number representing the month, 0 being january
 * @param short returns the abbreviated version of the month
 */
export const getMonthName = (month: number, short?: boolean) => {
  throwOnInvalidMonth(month);
  if (short) return MONTHS[month].shortName;
  return MONTHS[month].fullName;
};

/**
 *
 * ({month, year}) Gets the month and year before the given month and year
 * Example: getPreviousMonth(0, 2000) => {month: 11, year: 1999}
 * While: getPreviousMonth(11, 2000) => {month: 10, year: 2000}
 *
 * @param month
 * @param year
 */
export const getPreviousMonth = (month: number, year: number) => {
  let prevMonth = month - 1;
  let prevYear = year;
  if (prevMonth < 0) {
    prevMonth = 0;
    prevYear = year - 1;
  }
  return { month: prevMonth, year: prevYear };
};
/**
 * ({month, year}) Gets the month and year after the given month and year
 * For example: getNextMonth(0, 2000) => {month: 1, year: 2000}
 * while: getNextMonth(11, 2000) => {month: 0, year: 2001}
 *
 * @param month
 * @param year
 */
export const getNextMonth = (month: number, year: number) => {
  let nextMonth = (month + 1) % 12;
  let nextYear = year;
  if (nextMonth === 0) {
    nextYear = year + 1;
  }
  return { month: nextMonth, year: nextYear };
};

export const datesAreOnSameDay = (first: Date, second: Date) => {
  if (!first || !second) return false;
  return dateFns.isSameDay(first, second);
};

export const firstDayOfMonth = function (date: Date) {
  return dateFns.startOfMonth(date);
};

export const lastDayOfMonth = function (date: Date) {
  return dateFns.endOfMonth(date);
};

/**
 * Returns the first calendar date, including days outside the current month if they are on the same week.
 *
 * @param date
 */
export const firstCalendarDate = (date: Date) => {
  return dateFns.startOfWeek(firstDayOfMonth(date), { weekStartsOn: weekStartsOn });
};

/**
 * Returns the last calendar date, including days outside the current month if they are on the same week.
 *
 * @param date
 */
export const lastCalendarDate = (date: Date) => {
  return dateFns.endOfWeek(lastDayOfMonth(date), { weekStartsOn: weekStartsOn });
};

export const yesterday = (date: Date) => {
  return dateFns.addDays(date, -1);
};

export const tomorrow = (date: Date) => {
  return dateFns.addDays(date, 1);
};

/**
 * Get the week number of a specified date
 *
 * @param date
 * @param startOnSunday
 */
export const getWeek = (date: Date) => {
  return dateFns.getWeek(date, { weekStartsOn: weekStartsOn });
};

/**
 * Returns true if the date is within the defined interval
 *
 * @param date
 * @param startDate
 * @param endDate
 */
export const isWithinInterval = (date: Date, startDate: Date, endDate: Date) => {
  if (!date || !startDate || !endDate) return false;
  if (startDate <= endDate) return dateFns.isWithinInterval(date, { start: startDate, end: endDate });
  return dateFns.isWithinInterval(date, { start: endDate, end: startDate });
};

export const isWeekend = (date: Date) => {
  if (!date) return false;
  return dateFns.isWeekend(date);
};

/**
 * Creates an array of dates between the start and end date.
 *
 * @param startDate
 * @param endDate
 */
export const createDatesGroupedByWeek = (startDate: Date, endDate: Date) => {
  let weeks = [];
  let dates = [];
  const current = new Date(startDate);
  let week = getWeek(current);
  while (current < endDate) {
    let currentWeek = getWeek(current);
    if (week != currentWeek) {
      weeks.push([...dates]);
      dates = [];
      week = currentWeek;
    }
    dates = [...dates, new Date(current)];
    current.setDate(current.getDate() + 1);
  }
  if (dates.length > 0) weeks.push([...dates]);
  return weeks;
};

export const MIN_CALENDAR_DATE = new Date(0);
// 1 year from now
let d = new Date();
export const MAX_CALENDAR_DATE = lastDayOfMonth(new Date(d.getFullYear() + 1, d.getMonth(), 1));
