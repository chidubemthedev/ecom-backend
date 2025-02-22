import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.Schema<any>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Transform Zod error format into a readable array of messages
      const errorMessages = result.error.errors.map((issue) => ({
        field: issue.path.join("."), // Join nested paths if any
        message: issue.message,
      }));

      res.status(400).json({
        error: "Invalid data",
        details: errorMessages, // Now an array of { field, message }
      });
      return;
    }

    req.body = result.data; // Ensure only validated data is passed forward
    next();
  };
}
