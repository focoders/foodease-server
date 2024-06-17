import { Router } from "express";
import UserController from "./user.controller";
import { customerLoginValidation, customerRegistrationValidation } from "./user.validation";
import { validate } from "@/services/validator.services";

const router = Router()

router.post("/register", customerRegistrationValidation(), validate, UserController.registerCustomer)
router.post("/login", customerLoginValidation(), validate, UserController.loginCustomer)

export default router