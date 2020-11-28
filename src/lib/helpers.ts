import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const formatDate = (date: string): string =>
  dayjs(date).format("Do MMMM YYYY");
