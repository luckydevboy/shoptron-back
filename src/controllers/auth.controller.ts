import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import User from "@/models/user.model";
import catchAsync from "@/utils/catchAsync";
import AppError from "@/utils/appError";

export const register = catchAsync(async (req, res, next) => {
  const { password, name, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      status: "fail",
      message: "User not found.",
    });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    res.status(401).json({
      status: "fail",
      message: "Invalid email or password.",
    });
    return;
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
  });
});

export const protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401),
    );
  }
  const decoded = <jwt.JwtPayload>(
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET!)
  );

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401,
      ),
    );
  }

  req.userRole = currentUser.role;
  req.userId = decoded.id;

  next();
});

export const restrictTo =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.userRole)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  };
