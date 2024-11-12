import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    isAdmin: boolean;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const getToken = req.header("Authorization")?.replace("Bearer ", "");
  if (!getToken) {
    res.status(401).json({ message: "no token, authorization denied" });
    return;
  }
  try {
    const decoded = jwt.verify(getToken, process.env.JWT_SECRET as string) as {
      id: string;
      isAdmin: boolean;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "your token is not valid" });
  }
};

export const isAdminMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin role required" });
  }
};
