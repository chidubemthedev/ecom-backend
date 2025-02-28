import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized! Login to continue" });
    return;
  }

  try {
    // decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "");
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized! Login to continue" });
      return;
    }
    req.userId = (decoded as any).userId;
    req.role = (decoded as any).role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Something went wrong!" });
    return;
  }
};

export const verifySeller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.role;

  if (role !== "seller") {
    res
      .status(401)
      .json({
        message: "Unauthorized! Register as a seller to create a product",
      });
    return;
  }
  next();
};
