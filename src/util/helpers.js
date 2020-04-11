import dayjs from "dayjs";

export const getSortedCompanies = (companies) => {
  return companies.sort((com1, com2) => {
    const date1 = dayjs(com1.positions[0].start_date);
    const date2 = dayjs(com2.positions[0].start_date);

    return date2.diff(date1);
  });
};

export const getSortedPositions = (company) => {
  return company.positions.sort((pos1, pos2) => {
    const date1 = dayjs(pos1.start_date);
    const date2 = dayjs(pos2.start_date);

    return date2.diff(date1);
  });
};

export const getPeriod = (startDate, endDate) => {
  const years = endDate.diff(startDate, "year");
  const months = endDate.diff(startDate, "month") - years * 12;

  let period = null;

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

  return period;
};
