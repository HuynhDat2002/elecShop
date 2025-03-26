import { ICatalogRepository } from "@/interfaces/catalogRepository.interface";
import { Product } from "@/models/product.mode";
import { ProductFactory } from "@/utils/fixtures";
import {prisma} from '../db'
import * as errorResponse from '../utils/error'
export class CatalogRepository implements ICatalogRepository{
    async create(data: Product): Promise<Product> {
        // const product = ProductFactory.build()
        const newProduct = await prisma.product.create({
            data:{
                name:data.name,
                price:data.price,
                stock:data.stock,
                description:data.description
            }
        })
        if(!newProduct) throw new errorResponse.ValidationError("Cant not create product")
        return newProduct

    }
    async update(data: Product): Promise<Product> {
        const product = ProductFactory.build()
        return product
    }
    async delete(data: any): Promise<{}> {
        const product = ProductFactory.build()
        return product
    }
    async find(limit:number,offset:number): Promise<Product[]> {
        // const product = ProductFactory.buildList(limit)
        const products = await prisma.product.findMany({
            take:limit
        })
        return products
    }
    async findOne(id: number): Promise<Product> {
        const product = await prisma.product.findUnique({where:{id:id}})
        if(!product) throw new errorResponse.NotFound("Product not found")
        return product
    }
    async getProductStock(ids: number[]): Promise<Product[]> {
        const products = await prisma.product.findMany({
            where:{
                id:{
                    in:ids
                }
            }
        })
        return products
    }
} 