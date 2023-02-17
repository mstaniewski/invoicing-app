import { Request } from 'express';

export const cookieExtractor = function (req: Request) {
  const token = req.cookies['access_token'];

  return token;
};
