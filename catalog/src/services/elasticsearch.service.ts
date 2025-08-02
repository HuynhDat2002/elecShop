import { CatalogProduct } from '@/dto/payload.dto';
import {EventPayload} from '@/utils/AppEventListener';
import { Client } from '@elastic/elasticsearch';
import 'dotenv/config';
export class ElasticSearchService {
   private indexName="product"
  private client: Client;
   constructor(){
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL,
      maxRetries: 10,
      requestTimeout: 10000,
    
    })
    this.createIndex()
   }

   async handleEvents({event,data}:EventPayload){
         switch (event) {
              case "createProduct":
                await this.createProduct(data as CatalogProduct)
                console.log("createProduct event received elasticsearch")
                break;
              case "updateProduct":
                await this.updateProduct(data as CatalogProduct)
                console.log("updateProduct event received elasticsearch")
                break;
              case "deleteProduct":
                await this.deleteProduct((data as CatalogProduct).id.toString())
                console.log("deleteProduct event received elasticsearch")
                break;
         }
   }
   async createIndex(){
      const indexExists = await this.client.indices.exists({index:this.indexName})
      if(!indexExists){
        console.log("Index does not exist, creating index:", this.indexName);
          await this.client.indices.create({
              index:this.indexName,
              body:{
                mappings:{
                    properties:{
                      id:{type:"keyword"},
                      title:{type:"text"},
                      description:{type:"text"},
                      price:{type:"float"},
                      stock:{type:"integer"},
                    }
                }
              }
          })
      }else{
        console.log("Index already exists:", this.indexName);
      }
   }

   async getProduct(id:string){
    const result = await this.client.get({
      index:this.indexName,
      id:id.toString(),
    })

    return result._source
   }

   async createProduct(data:CatalogProduct){
    const result =await this.client.index({
      index:this.indexName,
      id:data.id.toString(),
      document:data
    })
    console.log("product created in elasticsearch", result)
   }

   async updateProduct(data:CatalogProduct){
    const result =await this.client.update({
      index:this.indexName,
      id:data.id.toString(),
      doc:data
    })
    console.log("product updated in elasticsearch", result)
   }

   async deleteProduct(id:string){
     const result = await this.client.delete({
      index:this.indexName,
      id:id.toString(),
     })
     console.log("product deleted in elasticsearch", result)
   }

   async searchProduct(search:string){
    const result = await this.client.search({
      index:this.indexName,
      query: search.length===0? {
        match_all:{}
      } : {
        multi_match:{
          query:search,
          fields:["name","description"],
          fuzziness:"AUTO",
        }
      }
    })
    console.log("search result from elasticsearch", result.hits.hits)
    return result.hits.hits.map((hit)=>hit._source)
   }
}