declare global {
  namespace Express {
    export interface Request {
      userId?: Number;
      cleanBody?: any;
    }
  }
}

export {};
