import type{ Request, Response, NextFunction } from "express";
import jwt, {type JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user: { userId: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

    const token = authHeader.split(" ")[1] as string;

  try {
    const decoded = jwt.verify(
      token,
      process.env['JWT_SECRET'] as string
    ) as unknown as JwtPayload & { userId: string };

    if (!decoded || !decoded.userId) {
      res.status(401).json({ error: "Invalid token payload" });
      return;
    }

    req.user = { userId: decoded.userId };

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
