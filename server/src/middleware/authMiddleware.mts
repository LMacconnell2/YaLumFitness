import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../services/auth.service.mts';
import type { Request, Response, NextFunction } from 'express';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });

  if (!session?.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // Attach to res.locals so routes can access it
  res.locals.user = session.user;
  res.locals.session = session.session;
  next();
}