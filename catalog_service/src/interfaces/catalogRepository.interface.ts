import { Product } from "@/models/product.mode"

export interface ICatalogRepository{
    create(data:Product): Promise<Product>
    update(data:Product): Promise<Product>
    delete(data:any): Promise<{}>
    find(limit:number,offset:number):Promise<Product[]>
    findOne(id:number):Promise<Product>
    getProductStock(ids:number[]):Promise<Product[]>
}