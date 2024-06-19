import { body } from "express-validator";

export function storeLoginValidation() {
    return [
      body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
      body("store_password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8, max: 127 }).withMessage(
          "Password should be at least 8 characters long and maximum 127 characters"
        ),
    ];
}

export function storeRegisterValidation() {
    return [
        body("email").trim().isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
        body("store_name").trim().notEmpty().withMessage("Store name is required"),
        body("description").trim().notEmpty().withMessage("Description is required"),
        body("store_password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 127 })
        .withMessage(
            "Password should be at least 8 characters long and maximum 127 characters"
        ),
        body("store_password_confirm")
        .notEmpty()
        .withMessage("Password confirmation is required")
        .custom(
            (value, { req }) =>
            req.body.store_password && value === req.body.store_password
        )
        .withMessage("Password confirmation not match"),
        body("free_time").isTime({
            hourFormat: 'hour24',
            mode: 'withSeconds',
        }).withMessage("Time format invalid").notEmpty().withMessage("Free time schema required"),
        body("address").notEmpty().withMessage("Address is required")
    ]
}
  