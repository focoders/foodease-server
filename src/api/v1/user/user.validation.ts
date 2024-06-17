import { body } from "express-validator";

export function customerRegistrationValidation() {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email address"),
    body("first_name")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3, max: 20 })
      .withMessage(
        "First name should be at least 3 characters and maximum 20 characters"
      ),
    body("last_name")
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 3, max: 20 })
      .withMessage(
        "Last name should be at least 3 characters and maximum 20 characters"
      ),
    body("customer_password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 127 })
      .withMessage(
        "Password should be at least 8 characters long and maximum 127 characters"
      ),
    body("confirm_password")
      .notEmpty()
      .withMessage("Password confirmation is required")
      .custom(
        (value, { req }) =>
          req.body.customer_password && value === req.body.customer_password
      )
      .withMessage("Password confirmation not match"),
  ];
}
