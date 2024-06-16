import { Router } from "express";
import UserController from "./user.controller";

const router = Router()

router.get("/find-user", UserController.findUser)

export default router