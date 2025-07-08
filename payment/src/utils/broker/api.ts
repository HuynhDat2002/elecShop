import axios from 'axios'
import {errorResponse} from '../error'
// import {Product} from '../../dto'
// import 'dotenv/config'
import {User} from '@/dto'
import { AuthorizeError } from '../error/errors'
import { InProcessOrder } from '@/dto/order.model'

const ORDER_BASE_URL = process.env.ORDER_BASE_URL 
// console.log('baseurl',CATALOG_BASE_URL)


const AUTH_SERVICE_BASE_URL = process.env.AUTH_SERVICE_BASE_URL||'http://localhost:9000'

export const GetOrderDetails =async (orderNumber:number)=>{
    const response = await axios.get(`${ORDER_BASE_URL}/api/order/${orderNumber}/checkout`)

    if(!response.data){
        throw new errorResponse.APIError("Order not found")
    }
    console.log('getorder:', response.data)
    const product = response.data as InProcessOrder
    return product
}

// export const GetStockDetails = async (ids:number[])=>{
//     try{
//         const response = await axios.post(`${CATALOG_BASE_URL}/api/product/stock`,{ids})
//         if(!response.data){
//             throw new errorResponse.APIError("Stock not found")
//         }
//         return response.data as Product[]
//     }
//     catch (error){
//         throw new errorResponse.NotFound("Error on getting stock details")
//     }
// }

export const ValidateUser = async (token:string)=>{
    try{
        axios.defaults.headers.common['Authorization'] = token
        const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/api/validate`,{
            headers:{
                Authorization:token
            }
        })
        if(response.status!==200){
            throw new AuthorizeError("User not authorized")
        }
        return response.data as User
    }
    catch (error){
        throw new AuthorizeError("Unauthorized")
    }
}   