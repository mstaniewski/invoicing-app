import { Request } from 'express';

export const reqExtractor = function (req: Request) {
  // @ts-ignore
  return req.token;
};
