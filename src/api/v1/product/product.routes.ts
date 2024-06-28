import { Router } from "express";
import { validate } from "@/services/validator.services";
import { verifyAuthToken } from "@/services/jwt.service";
import ProductController from "./product.controller";

const router = Router()

router.get('/', verifyAuthToken, ProductController.getNearestProduct)
router.get('/public', ProductController.getPublicNearestProduct)
router.get('/store-products', verifyAuthToken, ProductController.getProductByStore)
router.get('/:product_id', verifyAuthToken, ProductController.getProductById)
router.put('/:product_id', verifyAuthToken, ProductController.updateProductDetails)
router.put('/:product_id/stock', verifyAuthToken, ProductController.updateProductStock)
router.post('/create', verifyAuthToken, ProductController.addNewProduct)
router.delete('/:product_id', verifyAuthToken, ProductController.deleteProductById)

export default router