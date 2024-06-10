import { Router } from "express";
import StatusController from "./status.controller";

const router = Router()

router.get("/", StatusController.nodeServerStatusCheck)
router.get("/db-status", StatusController.databaseStatusCheck)

export default router