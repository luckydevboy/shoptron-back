import express from "express";
import { login, register } from "@/controllers/auth.controller";
import { validateRequest } from "@/middlewares/validation.middleware";
import {
  loginValidationRules,
  registerValidationRules,
} from "@/validations/auth.validation";

const router = express.Router();

router.post("/register", registerValidationRules, validateRequest, register);
router.post("/login", loginValidationRules, validateRequest, login);

export default router;
