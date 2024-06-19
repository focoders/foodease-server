import { Router } from "express";
import { validate } from "@/services/validator.services";
import { verifyAuthToken } from "@/services/jwt.service";
import StoreController from "./store.controller";

const router = Router()

router.post("/register", StoreController.registerStore)
router.post("/login", StoreController.loginStore)
router.get("/current", verifyAuthToken, StoreController.getCurrentStore)

export default router