declare global {
  namespace Express {
    export interface Request {
      userId?: Number;
      role?: "user" | "admin" | "seller";
      cleanBody?: any;
    }
  }
}

export {};
