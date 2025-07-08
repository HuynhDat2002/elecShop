import { CartLineItems,Cart } from '@prisma/client'
import {prisma} from '../db/prisma.init'
import  {errorResponse} from '../utils'
import { CartWithLineItems } from '@/dto'

export type CartRepositoryType = {
    createCart: (customerId:number,lineItem:CartLineItems)=>Promise<number>
    findCart: (id:number)=>Promise<CartWithLineItems>;
    updateCart: (id:number,qty:number)=>Promise<CartLineItems>;
    deleteCart: (id:number)=>Promise<Boolean>
    clearCartData: (id:number)=>Promise<Boolean>
    findCartByProductId:(customerId:number,productId:number)=>Promise<CartLineItems|null>


}

const createCart = async (
    customerId: number,
    {itemName,price,qty,productId,variant}:CartLineItems
):Promise<number>=>{
    //connect to db
    const result  =await prisma.cart.upsert({
        where:{customerId:customerId},
        update:{updatedAt:new Date()},
        create:{customerId:customerId}
    })
    if(!result){
        throw new errorResponse.ValidationError("Cart cant not be created")
    }
    if(result.id>0){
        const cartLine = await prisma.cartLineItems.create({
            data:{
                cart:{
                    connect:{
                        id:result.id as number
                    }
                },
                // customerId:customerId,
                productId:productId,
                itemName:itemName,
                price:price,
                qty:qty,
                variant:variant
            }
        })

        if(!cartLine){
            throw new errorResponse.ValidationError("CartLineItem cant not be created")
        }
    }
    return result.id
}
const findCart = async (customerId:number):Promise<CartWithLineItems> =>{
   const cart = await prisma.cart.findUnique({
    where:{
        customerId:customerId,
    },
    include:{
        cartLineItems:true
    }
   }) 
   
   if(!cart) throw new errorResponse.NotFound("Cart not found")
    return cart
}
const updateCart = async (id:number,qty:number):Promise<CartLineItems> =>{
    const cartLineItems = await prisma.cartLineItems.update({
        where:{
            id:id
        },
        data:{
            qty:qty
        }
    })
    if(!cartLineItems) throw new errorResponse.NotFound("CartLineItem not found")
    return cartLineItems
}
const deleteCart = async (id:number): Promise<Boolean> =>{
    await prisma.cartLineItems.delete({
        where:{
            id:id
        }
    })
    return true
}


const clearCartData = async (customerId:number): Promise<Boolean> =>{
    await prisma.cart.delete({
        where:{
            customerId:customerId
        }
    })
    return true
}

const findCartByProductId = async (customerId:number,productId:number):Promise<CartLineItems|null> =>{
    
    const cartLineItems = await prisma.cartLineItems.findFirst({
        where:{
            cart:{
                customerId:customerId
            },
            productId:productId
        }
    })
    // if(!cartLineItems) throw new errorResponse.NotFound("CartLineItem not found with this productId and customerId")
    return cartLineItems ? cartLineItems :null
}
export const CartRepository: CartRepositoryType = {
    createCart,
    findCart,
    updateCart,
    deleteCart,
    clearCartData,
    findCartByProductId
}