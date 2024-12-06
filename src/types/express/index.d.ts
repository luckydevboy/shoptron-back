import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userRole: "admin" | "user";
      userId: string;
    }
  }
}
