import { CatalogRepository } from '../repositories/catalog.repository';
import asyncHandler from '../helpers/asyncHandler.helper';
import express,{Request,Response,NextFunction} from 'express';
import { CatalogService } from '../services/catalog.service';
import 'module-alias/register';
import { RequestValidator } from '../utils/requestValidator';
import { CreateProductRequest, UpdateProductRequest } from '../dto/product.dto';
const router = express.Router()

export const catalogService  = new CatalogService(new CatalogRepository());

//endpoints

router.post("/product", async (req:Request,res:Response,next:NextFunction):Promise<any> => {
    // try{

        const {errors,input} =await RequestValidator(CreateProductRequest,req.body)
        if(errors) return res.status(400).json(errors)
        const data = await catalogService.createProduct(input)
        return res.status(201).json(data)
    // }
    // catch (err){
    //     // next(err)
    //     const error = err as Error
    //     return res.status(500).json(error.message)
    // }
})


router.patch("/product/:id", async (req:Request,res:Response,next:NextFunction):Promise<any> => {
    try{

        const {errors,input} =await RequestValidator(UpdateProductRequest,req.body)
        if(errors) return res.status(400).json(errors)

        const id = parseInt(req.params.id) || 0
        const data = await catalogService.updateProduct({id,...input})
        return res.status(200).json(data)
    }
    catch (err){
        const error = err as Error
        return res.status(500).json(error.message)
    }
})

router.get("/products", async (req:Request,res:Response,next:NextFunction):Promise<any> => {
    try{
        const limit = Number(req.query.limit)
        const offset =  Number(req.query.offset)

        const data = await catalogService.getProducts(limit,offset)
        return res.status(200).json(data)
    }
    catch (err){
        const error = err as Error
        return res.status(500).json(error.message)
    }
})

router.get("/product/:id", async (req:Request,res:Response,next:NextFunction):Promise<any> => {
    try{
        const id = Number(req.params.id)

        const data = await catalogService.getProduct(id)
        return res.status(200).json(data)
    }
    catch (err){
        return next(err)
    }
})

router.delete("/product/:id", async (req:Request,res:Response,next:NextFunction):Promise<any> => {
    try{
        const id = Number(req.params.id)

        const data = await catalogService.deleteProduct(id)
        return res.status(200).json(data)
    }
    catch (err){
        const error = err as Error
        return res.status(500).json(error.message)
    }
})


router.post("/product/stock", async (req:Request,res:Response,next:NextFunction):Promise<any> => {
    try{
        const ids =req.body.ids

        const data = await catalogService.getProductStock(ids)
        return res.status(200).json(data)
    }
    catch (err){
        const error = err as Error
        return res.status(500).json(error.message)
    }
})

export default router