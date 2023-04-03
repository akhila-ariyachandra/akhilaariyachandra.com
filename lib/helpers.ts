"server-only";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const formatDate = (date: string): string =>
  dayjs(date).format("Do MMMM YYYY");

export const getPeriod = (start: string, end?: string) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  const years = endDate.diff(startDate, "year");
  const months = endDate.diff(startDate, "month") - years * 12;

  let period = "";

  if (years > 0) {
    if (years === 1) {
      period = "1 year";
    } else {
      period = `${years} years`;
    }
  }

  if (months > 0) {
    if (period) {
      period += ", ";
    } else {
      period = "";
    }

    if (months === 1) {
      period += "1 month";
    } else {
      period += `${months} months`;
    }
  }

  if (years === 0 && months === 0) {
    const days = endDate.diff(startDate, "day");

    if (days === 1) {
      period = `${days} day`;
    } else {
      period = `${days} days`;
    }
  }

  return period;
};
