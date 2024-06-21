import { apiResponse } from "@/utils/response";
import { Request, Response } from "express";
import { ParamsDictionary } from  "express-serve-static-core"
import { AddNewProductSchema } from "./product.schema";
import { addNewProduct } from "./product.queries";
import pool from "@/database/pool";
import { getCategoryIdBySlug } from "../category/category.queries";

export default class ProductController {
    static async addNewProduct(req: Request<ParamsDictionary, any, AddNewProductSchema>, res: Response){
        try {
            
            // cek kategori 
            const productCategory = await getCategoryIdBySlug.run({ slug: req.body.category_slug }, pool)
            
            if(!productCategory || productCategory.length === 0){
                return res.status(404).json(
                    apiResponse(null, false, "Invalid category")
                )
            }

            return res.status(200).json(
                apiResponse(productCategory[0].id, true, "Product Category is valid")
            )

            // const newProduct = addNewProduct.run({
            //     product: {
            //         product_name: req.body.product_name,
            //         description: req.body.description,
            //         price_before: req.body.price_before,
            //         price_after: req.body.price_after,
            //         production_time: req.body.production_time,
            //         expired_time: req.body.expired_time,
            //         stock: req.body.stock,
            //         category_id: req.body.category_id,
            //         image_id: req.body.image_id,
            //         store_id: req.body.payload.data
            //     }
            // }, pool)
            
        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }
    }
}