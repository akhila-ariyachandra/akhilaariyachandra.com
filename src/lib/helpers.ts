import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import nookies from "nookies";
import type { NextApiResponse } from "next";

dayjs.extend(advancedFormat);

export const formatDate = (date: string): string =>
  dayjs(date).format("Do MMMM YYYY");

export const fetcher = (url) => fetch(url).then((r) => r.json());

export const setCookie = (
  key: string,
  value: string,
  res?: NextApiResponse
) => {
  nookies.set({ res }, key, value, { path: "/", sameSite: "Strict" });
};

export const deleteCookie = (key: string, res?: NextApiResponse) => {
  nookies.destroy({ res }, key, { path: "/" });
};
