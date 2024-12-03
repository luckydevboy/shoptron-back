import CustomError from "@/types/customError.interface";
import { Error } from "mongoose";

class AppError implements CustomError {
  code: number;
  errmsg: string;
  errors: { message: string }[];
  isOperational: boolean;
  message: string;
  name: string;
  path: string;
  stack: string;
  status: string;
  statusCode: number;
  value: number;
  keyValue: Record<string, number | string | boolean>;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.code = 0;
    this.name = "AppError";
    this.stack = new Error("stack").stack || "";
    this.path = "";
    this.value = 0;
    this.errmsg = message;
    this.errors = [{ message: message }];
    this.keyValue = {};

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
