import type { NextApiRequest, NextApiResponse } from "next";

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
}

export const context = ({ req, res }) => ({ req, res });
