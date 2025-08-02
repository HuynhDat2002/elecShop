import { ICatalogRepository } from "@/interfaces/catalogRepository.interface";
import { classToPlain } from "class-transformer";
import { NotFound,AuthorizeError,ValidationError } from "@/utils";
import { OrderWithLineItems } from "@/types/message.type";
import { AppEventListener } from "@/utils/AppEventListener";
import { ElasticSearchService } from "./elasticsearch.service";
export class CatalogService{
    private _repository: ICatalogRepository;
    constructor(repository:ICatalogRepository){
        this._repository = repository;
    }
   async createProduct(input:any){
       console.log('input',input)
       const data = await this._repository.create(input)
     
       if(!data.id){
        throw new Error("unable to create product")
       }

       // notify to elasticsearch to create record
       AppEventListener.instance.notify({
        event:"createProduct",
        data:data
       })
       return data
    }

    async updateProduct(input:any){
       const data = await this._repository.update(input)
       //emit event to update record in ElasticSearch
       if(!data.id){
        throw new Error("unable to update product")
       }

       // notify to elasticsearch to update record
       AppEventListener.instance.notify({
        event:"updateProduct",
        data:data
       })
       return data
        
    }

    //we will get product from ElasticSearch
    async getProducts(limit:number,offset:number,search:string){
        const elkSearch = new ElasticSearchService()
        const products = await elkSearch.searchProduct(search)
        console.log("products got from elasticsearch", products)
        // const products = await this._repository.find(limit,offset)
        return products
    }

    async getProduct(id:number){
        const product = await this._repository.findOne(id)
        return product
    }

    async deleteProduct(id:number){
        const product = await this._repository.delete(id)

        //delete record from ElasticSearch
        AppEventListener.instance.notify({
            event:"deleteProduct",
            data:{id}
           })
        return product
    }
    async getProductStock(ids:number[]){
        const products = await this._repository.getProductStock(ids)
        if(!products){
            throw new NotFound("Products not found")
        }
        return products
    }

    async handleBrokerMessage(message:any){
        console.log("Catalog Service Received Message,", message)
        const orderData = message.data as OrderWithLineItems
        const {orderLineItems} = orderData
        orderLineItems.forEach(async (item)=>{
            console.log('item in orderlineitems',item)
            const product = await this.getProduct(item.productId)
            if(product.stock<item.qty) throw new ValidationError("Product is out of stock")
            const updateStock  = product.stock-item.qty
            await this.updateProduct({...product,stock:updateStock})
        })
    }   
}