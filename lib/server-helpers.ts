import "server-only";

import { type NextRequest } from "next/server";

export const getIp = (request: NextRequest) => {
  let ip = request.ip ?? request.headers.get("x-real-ip");
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(",").at(0) ?? "Unknown";
  }
  if (!ip) {
    ip = "127.0.0.1";
  }

  return ip;
};
