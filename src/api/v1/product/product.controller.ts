import { apiResponse } from "@/utils/response";
import { Request, Response } from "express";
import { ParamsDictionary } from  "express-serve-static-core"
import { AddNewProductSchema, convertToGetProductById, manageProductById } from "./product.schema";
import { addNewProduct, getProductById, IAddNewProductResult } from "./product.queries";
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

            const addProduct = await addNewProduct.run({
                product: {
                    product_name: req.body.product_name,
                    description: req.body.description,
                    price_before: req.body.price_before,
                    price_after: req.body.price_after,
                    production_time: req.body.production_time,
                    expired_time: req.body.expired_time,
                    stock: req.body.stock,
                    category_id: productCategory[0].id,
                    image_id: req.body?.image_id,
                    store_id: req.body.payload.data
                }
            }, pool)

            const newProduct = await getProductById.run({
                id: addProduct[0].id
            }, pool)

            if(!newProduct || newProduct.length === 0){
                return res.status(400).json(
                    apiResponse(null, false, "Add new product failed" )
                )
            }

            return res.status(200).json(
                apiResponse(newProduct[0], true, "New product successfully added")
            )
            
        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }
    }

    static async getProductById(req: Request<ParamsDictionary, any, manageProductById>, res: Response){
        try {
            const productById = await getProductById.run({
                id: req.params.product_id
            }, pool)

            if(!productById || productById.length === 0){
                return res.status(404).json(
                    apiResponse(null, false, "Product not found")
                )            
            }

            return res.status(200).json(
                apiResponse(convertToGetProductById(productById[0]), true, "Product fetched successfully")
            )

        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }
    }

    

}