export const LINKS_STATS_TIME_ZONE = "Europe/Paris";
export const LINKS_STATS_DAYS = 7;
export const LINKS_STATS_MAX_RANGE_DAYS = 366;

type CalendarDate = {
  year: number;
  month: number;
  day: number;
};

export type LinksStatsDay = {
  date: string;
  start: string;
  end: string;
};

export type LinksStatsWindow = {
  startDate: string;
  endDate: string;
  start: string;
  end: string;
  todayStart: string;
  daily: LinksStatsDay[];
};

export type LinksStatsRangeInput = {
  start?: string | null;
  end?: string | null;
};

const parisDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: LINKS_STATS_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function parisDateParts(date: Date): CalendarDate & { hour: number; minute: number; second: number } {
  const parts = Object.fromEntries(
    parisDateFormatter.formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
    second: parts.second,
  };
}

function addCalendarDays(date: CalendarDate, days: number): CalendarDate {
  const shifted = new Date(Date.UTC(date.year, date.month - 1, date.day + days));
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  };
}

function parisOffsetMilliseconds(date: Date): number {
  const parts = parisDateParts(date);
  const representedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  return representedAsUtc - date.getTime();
}

function parisMidnight(date: CalendarDate): Date {
  const nominalUtc = Date.UTC(date.year, date.month - 1, date.day);
  let resolved = new Date(nominalUtc - parisOffsetMilliseconds(new Date(nominalUtc)));
  resolved = new Date(nominalUtc - parisOffsetMilliseconds(resolved));
  return resolved;
}

function dateKey(date: CalendarDate): string {
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

function parseDateKey(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const parsed = {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
  return dateKey(parsed) === value
    && dateKey(addCalendarDays(parsed, 0)) === value
    ? parsed
    : null;
}

function calendarDayDistance(start: CalendarDate, end: CalendarDate): number {
  const startUtc = Date.UTC(start.year, start.month - 1, start.day);
  const endUtc = Date.UTC(end.year, end.month - 1, end.day);
  return Math.round((endUtc - startUtc) / 86_400_000);
}

export function buildLinksStatsRange(
  input: LinksStatsRangeInput,
  now = new Date(),
): LinksStatsWindow {
  const hasStart = Boolean(input.start);
  const hasEnd = Boolean(input.end);
  if (hasStart !== hasEnd) throw new RangeError("START_AND_END_REQUIRED");

  const current = parisDateParts(now);
  const today: CalendarDate = { year: current.year, month: current.month, day: current.day };
  const startDate = hasStart ? parseDateKey(String(input.start)) : addCalendarDays(today, -(LINKS_STATS_DAYS - 1));
  const endDate = hasEnd ? parseDateKey(String(input.end)) : today;
  if (!startDate || !endDate) throw new RangeError("DATE_INVALID");

  const distance = calendarDayDistance(startDate, endDate);
  if (distance < 0) throw new RangeError("DATE_ORDER_INVALID");
  if (distance + 1 > LINKS_STATS_MAX_RANGE_DAYS) throw new RangeError("RANGE_TOO_LARGE");

  const daily = Array.from({ length: distance + 1 }, (_, index) => {
    const date = addCalendarDays(startDate, index);
    const next = addCalendarDays(date, 1);
    return {
      date: dateKey(date),
      start: parisMidnight(date).toISOString(),
      end: parisMidnight(next).toISOString(),
    };
  });

  return {
    startDate: dateKey(startDate),
    endDate: dateKey(endDate),
    start: daily[0].start,
    end: daily[daily.length - 1].end,
    todayStart: parisMidnight(today).toISOString(),
    daily,
  };
}

export function buildLinksStatsWindow(now = new Date()): LinksStatsWindow {
  return buildLinksStatsRange({}, now);
}
