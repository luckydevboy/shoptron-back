import { check } from "express-validator";

export const registerValidationRules = [
  check("name").notEmpty().trim().withMessage("Name is required"),
  check("email").isEmail().trim().withMessage("Invalid email address"),
  check("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(
      "Password must be at least 8 characters long and include one " +
        "lowercase letter, one uppercase letter, one number, and one symbol.",
    ),
  check("confirmPassword")
    .exists()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

export const loginValidationRules = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password").exists().withMessage("Password is required"),
];
