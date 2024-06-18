import { Router } from "express";
import UserController from "./user.controller";
import { customerLoginValidation, customerRegistrationValidation } from "./user.validation";
import { validate } from "@/services/validator.services";
import { verifyAuthToken } from "@/services/jwt.service";

const router = Router()

router.post("/register", customerRegistrationValidation(), validate, UserController.registerCustomer)
router.post("/login", customerLoginValidation(), validate, UserController.loginCustomer)
router.get("/current", verifyAuthToken, UserController.getCurentCustomer)

export default router