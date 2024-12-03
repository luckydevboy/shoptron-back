interface CustomError extends Error {
  statusCode: number;
  status: string;
  code: number;
  name: string;
  message: string;
  stack: string;
  path: string;
  value: number;
  errmsg: string;
  errors: { message: string }[];
  isOperational: boolean;
  keyValue: Record<string, number | string | boolean>;
}

export default CustomError;
