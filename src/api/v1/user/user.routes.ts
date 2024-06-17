import { Router } from "express";
import UserController from "./user.controller";

const router = Router()

router.get("/find-user", UserController.findUser)
router.post("/register", UserController.registerCustomer)

export default router