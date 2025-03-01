declare global {
  namespace Express {
    export interface Request {
      userId?: number;
      role?: "user" | "admin" | "seller";
      cleanBody?: any;
    }
  }
}

export {};
