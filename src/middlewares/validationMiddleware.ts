import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// Define the validation options for multiple parts of the request
interface ValidationSchemas {
  body?: z.Schema<any>;
  query?: z.Schema<any>;
  params?: z.Schema<any>;
}

export function validateData(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: { field: string; message: string }[] = [];

    // Validate each schema if provided
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        errors.push(
          ...result.error.errors.map((issue) => ({
            field: `body.${issue.path.join(".")}`,
            message: issue.message,
          }))
        );
      } else {
        req.body = result.data; // Assign validated data
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        errors.push(
          ...result.error.errors.map((issue) => ({
            field: `query.${issue.path.join(".")}`,
            message: issue.message,
          }))
        );
      } else {
        req.query = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        errors.push(
          ...result.error.errors.map((issue) => ({
            field: `params.${issue.path.join(".")}`,
            message: issue.message,
          }))
        );
      } else {
        req.params = result.data;
      }
    }

    // If there are validation errors, return a response
    if (errors.length > 0) {
      res.status(400).json({
        error: "Invalid data",
        details: errors,
      });
      return;
    }

    next();
  };
}
