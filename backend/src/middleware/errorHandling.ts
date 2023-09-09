import { Request, Response } from "express";

class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  return res
    .status(500)
    .json({ success: false, message: "Something went wrong" });
};

const notFound = (req: Request, res: Response) => {
  return res
    .status(404)
    .json({ success: false, message: "Resource not found" });
};

export { CustomError, errorHandler, notFound };
