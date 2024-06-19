import { Router } from "express";
import { validate } from "@/services/validator.services";
import { verifyAuthToken } from "@/services/jwt.service";
import StoreController from "./store.controller";
import { storeLoginValidation, storeRegisterValidation } from "./store.validation";

const router = Router()

router.post("/register", storeRegisterValidation(), validate, StoreController.registerStore)
router.post("/login", storeLoginValidation(), validate, StoreController.loginStore)
router.get("/current", verifyAuthToken, StoreController.getCurrentStore)

export default router