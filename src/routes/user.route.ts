import express from "express";
import {
  login,
  protect,
  register,
  restrictTo,
} from "@/controllers/auth.controller";
import { getUsers } from "@/controllers/user.controller";
import { validateRequest } from "@/middlewares/validation.middleware";
import {
  loginValidationRules,
  registerValidationRules,
} from "@/validations/auth.validation";

const router = express.Router();

router.post("/register", registerValidationRules, validateRequest, register);
router.post("/login", loginValidationRules, validateRequest, login);

router.get("/", protect, restrictTo("admin"), getUsers);

export default router;
