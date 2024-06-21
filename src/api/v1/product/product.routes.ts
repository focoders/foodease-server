import { Router } from "express";
import { validate } from "@/services/validator.services";
import { verifyAuthToken } from "@/services/jwt.service";
import ProductController from "./product.controller";

const router = Router()

router.post('/create', verifyAuthToken, ProductController.addNewProduct)

export default router