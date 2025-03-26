import { CartRepositoryType } from "@/repository/cart.repository";
import { OrderRepositoryType } from "@/repository/order.repository";
import { Order } from "@prisma/client";
import { errorResponse } from "@/utils";
import { OrderStatus } from "@/types/order.type";
import { OrderLineItems, OrderWithLineItems } from "@/dto";
import { MessageType } from "@/types";

export const CreateOrder = async (
    userId:number,
    repo:OrderRepositoryType,
    cartRepo:CartRepositoryType
)=>{
    // find cart by customer id
    const cart  = await cartRepo.findCart(userId)
    if(!cart) throw new errorResponse.NotFound("Cart not found")

    // calculate total order amount
    let cartTotal=0
    let orderLineItems:OrderLineItems[] = []

    // create order line items from cart items
    cart.cartLineItems.forEach(item=>{
        cartTotal+=Number(item.price)*item.qty
        orderLineItems.push({
            productId:item.productId,
            itemName:item.itemName,
            price:item.price,
            qty:item.qty
        } as OrderLineItems)
    })
    // create order with line items
    const orderInput:OrderWithLineItems ={
        orderNumber: Math.floor(Math.random()*1000000),
        txnId:null,
        customerId:userId,
        amount: cartTotal,
        orderLineItems:orderLineItems,
        status:OrderStatus.PENDING

    } 
    

    const order  = await repo.createOrder(orderInput)
    if(!order) throw new errorResponse.ValidationError('Can not create order')

    await cartRepo.clearCartData(userId)
    //fire a message to subscription service [catalog service] to update stock

    // await  repo.publishOrderEvent(order,"ORDER_CREATED")

    
    //return success message
    return {message:"Order created successfully",orderNumber:order}
}

export const UpdateOrder =async (
    orderId:
    number,
    status:string,
    repo:OrderRepositoryType
) => {
    //update status
    await repo.updateOrderStatus(orderId, status)

    //fire a message to subscription service [catalog service] to update stock
    // TODO: handle kafka calls
    if(status===OrderStatus.CANCELLED){
        // await repo.publishOrderEvent(order,"ORDER_CANCELLED")
    }


}

export const GetOrder = async (orderId:number,repo:OrderRepositoryType)=>{
    const order = await repo.findOrder(orderId)
    if(!order) throw new errorResponse.NotFound('Order not found')
    return order
}

export const GetOrders = async (userId:number,repo:OrderRepositoryType)=>{
    const orders = await repo.findOrdersByCustomerId(userId)
    if((Array.isArray(orders) && orders.length<=0) || !Array.isArray(orders)) throw new errorResponse.NotFound('Order not found')
    return orders
}

export const DeleteOrder = async (orderId:number,repo:OrderRepositoryType)=>{
    const result = await repo.deleteOrder(orderId)
    if(!result) throw new errorResponse.ValidationError('Can not delete order')
    return true
}

export const HandleSubscription = async (message:MessageType)=>{
    console.log("Message received by order Kafka consumer", message)
    // if (message.event === OrderEvent.CREATE_ORDER) 
    // call create order
}