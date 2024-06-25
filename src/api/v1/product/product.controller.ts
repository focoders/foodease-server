import { apiResponse } from "@/utils/response";
import { Request, Response } from "express";
import { ParamsDictionary } from  "express-serve-static-core"
import { AddNewProductSchema, convertToGetProductById, manageProductById, updateProductStockSchema } from "./product.schema";
import { addNewProduct, deleteProductById, getNearestProduct, getNearestProductWithQuery, getProductById, getProductOwner, IAddNewProductResult, updateProductById, updateStockProductById } from "./product.queries";
import pool from "@/database/pool";
import { getCategoryIdBySlug } from "../category/category.queries";
import { getCustomerActiveCoordinates } from "../address/address.queries";

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

    static async updateProductDetails(req: Request<ParamsDictionary, any, AddNewProductSchema>, res: Response){
        try {
            
            const checkProductOwnedByStore = await getProductOwner.run({
                id: req.params.product_id
            }, pool)

            if(!checkProductOwnedByStore || checkProductOwnedByStore.length === 0){
                return res.status(400).json(
                    apiResponse(null, true, "Product doesnt exists")
                )
            }

            const category = await getCategoryIdBySlug.run({
                slug: req.body.category_slug
            }, pool)

            if(!category || category.length === 0){
                return res.status(400).json(
                    apiResponse(null, false, "Invalid Category")
                )
            }

            const updatedProduct = await updateProductById.run({
                id: req.params.product_id,
                product_name: req.body.product_name,
                description: req.body.description,
                price_after: req.body.price_after,
                price_before: req.body.price_before,
                production_time: req.body.production_time,
                expired_time: req.body.expired_time,
                image_id: req.body.image_id,
                category_id: category[0].id,
                store_id: req.body.payload.data
            }, pool)

            const checkUpdatedProduct = await getProductById.run({ id:updatedProduct[0].id }, pool)

            if(!checkUpdatedProduct || checkUpdatedProduct.length === 0){
                return res.status(400).json(
                    apiResponse(null, false, "Update product failed")
                )
            }

            return res.status(200).json(
                apiResponse(updatedProduct, true, "Product updated successfully")
            )

        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server error")
            )
        }
    }

    static async updateProductStock (req: Request<ParamsDictionary, any, updateProductStockSchema>, res: Response){
        try {
            
            const checkProductOwnedByStore = await getProductOwner.run({
                id: req.params.product_id
            }, pool)

            if(!checkProductOwnedByStore || checkProductOwnedByStore.length === 0){
                return res.status(400).json(
                    apiResponse(null, true, "Product doesnt exists")
                )
            }

            const updatedStock = await updateStockProductById.run({
                id: req.params.product_id,
                store_id: req.body.payload.data,
                stock: req.body.stock
            }, pool)

            const checkUpdatedProduct = await getProductById.run({ id:updatedStock[0].id }, pool)

            if(!checkUpdatedProduct || checkUpdatedProduct.length === 0){
                return res.status(400).json(
                    apiResponse(null, false, "Update product failed")
                )
            }

            return res.status(200).json(
                apiResponse(updatedStock, true, "Product updated successfully")
            )

        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server error")
            )
        }
    }

    static async deleteProductById(req: Request<ParamsDictionary, any,  manageProductById>, res: Response){
        try {
            const checkProductOwnedByStore = await getProductOwner.run({
                id: req.params.product_id
            }, pool)

            if(!checkProductOwnedByStore || checkProductOwnedByStore.length === 0){
                return res.status(400).json(
                    apiResponse(null, true, "Product doesnt exists")
                )
            }

            await deleteProductById.run({
                id: req.params.product_id,
                store_id: req.body.payload.data
            }, pool)

            const checkDeletedProduct = await getProductById.run({ id: req.params.product_id }, pool)
            
            return res.status(200).json(
                apiResponse(null, true, "Product deleted successfully")
            )

        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server error")
            )
        }
    }


    static async getNearestProduct(req: Request<ParamsDictionary, any, manageProductById>, res: Response){
        try {
             
            const userCoordinates = await getCustomerActiveCoordinates.run({
                customer_id: req.body.payload.data
            }, pool)


            let nearestProductsResult
            if(req.query.product === undefined){
                nearestProductsResult = await getNearestProduct.run({
                    user_coordinates: userCoordinates[0].coordinates,
                    max_distance: parseInt(req.query.distance!.toString()),
                    limit: parseInt(req.query.limit!.toString()),
                    offset: parseInt(req.query.offset!.toString())
                }, pool)
            } else {
                nearestProductsResult = await getNearestProductWithQuery.run({
                    user_coordinates: userCoordinates[0].coordinates,
                    max_distance: parseInt(req.query.distance!.toString()),
                    limit: parseInt(req.query.limit!.toString()),
                    offset: parseInt(req.query.offset!.toString()),
                    product: req.query.product!.toString()
                }, pool)
            }

            return res.status(200).json(
                apiResponse(nearestProductsResult, true, "Product Fetched Successfully")
            )

        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }
    }

    static async getPublicNearestProduct(req: Request, res: Response){
        
        try { 
            const userCoordinates = await getCustomerActiveCoordinates.run({
                customer_id: process.env.DEFAULT_ADDRESS_ID,
            }, pool)

            if(!userCoordinates || userCoordinates.length === 0){
                return res.status(400).json(
                    apiResponse(null, false, "Customer not found")
                )
            }

            let nearestProductsResult
            if(req.query.product === undefined){
                nearestProductsResult = await getNearestProduct.run({
                    user_coordinates: userCoordinates[0].coordinates,
                    max_distance: parseInt(req.query.distance!.toString()),
                    limit: parseInt(req.query.limit!.toString()),
                    offset: parseInt(req.query.offset!.toString())
                }, pool)
            } else {
                nearestProductsResult = await getNearestProductWithQuery.run({
                    user_coordinates: userCoordinates[0].coordinates,
                    max_distance: parseInt(req.query.distance!.toString()),
                    limit: parseInt(req.query.limit!.toString()),
                    offset: parseInt(req.query.offset!.toString()),
                    product: req.query.product!.toString()
                }, pool)
            }

            return res.status(200).json(
                apiResponse(nearestProductsResult, true, "Product Fetched Successfully")
            )

        } catch (error) {
            console.error(error)
            return res.status(500).json(
                apiResponse(null, false, "Internal Server Error")
            )
        }
    }

}