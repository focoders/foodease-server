import { Router } from "express";
import UserController from "./user.controller";
import { customerRegistrationValidation } from "./user.validation";
import { validate } from "@/services/validator.services";

const router = Router()

router.post("/register", customerRegistrationValidation(), validate, UserController.registerCustomer)

export default router