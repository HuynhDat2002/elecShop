import { OrderWithLineItems } from "../dto";
import { prisma } from "@/db/prisma.init";
import { errorResponse } from "@/utils";
import { OrderStatus } from "@/types/order.type";
import { orderService } from '@/service';
export type OrderRepositoryType = {
    createOrder: (lineItem: OrderWithLineItems) => Promise<number>
    findOrder: (orderId: number) => Promise<OrderWithLineItems | null>
    findOrderByOrderNumber: (orderNumber: number) => Promise<OrderWithLineItems | null>
    updateOrderStatus: (orderId: number, status: string) => Promise<OrderWithLineItems>;
    deleteOrder: (orderId: number) => Promise<Boolean>
    findOrdersByCustomerId: (customerId: number) => Promise<OrderWithLineItems[]>
}


const createOrder = async (
    lineItems: OrderWithLineItems
): Promise<number> => {
    //connect to db
    const result = await prisma.order.create({
        data: {
            orderNumber: lineItems.orderNumber,
            customerId: lineItems.customerId,
            txnId: lineItems.txnId,
            amount: lineItems.amount,
            status: lineItems.status,
            orderLineItems: {
                create: lineItems.orderLineItems.map((item) => (
                    {
                        productId: item.productId,
                        itemName: item.itemName,
                        qty: item.qty,
                        price: item.price
                    }
                ))
            }
        }
    })
    if (!result) {
        throw new errorResponse.ValidationError("Order cant not be created")
    }
    // if (result.id > 0) {
    //     orderItems.forEach(async (item) => {
    //         await prisma.orderLineItems.create({
    //             data: {
    //                 orderId: result.id as number,
    //                 productId: item.productId,
    //                 itemName: item.itemName,
    //                 price: item.price,
    //                 qty: item.qty
    //             }
    //         })
    //     })
    // }
    return result.orderNumber
}

const findOrder = async (orderId: number): Promise<OrderWithLineItems | null> => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            orderLineItems: true
        }
    }) as OrderWithLineItems

    if(!order) throw new errorResponse.NotFound('Order not found')
    return order
}


const findOrderByOrderNumber = async (orderNumber: number): Promise<OrderWithLineItems | null> => {
    const order = await prisma.order.findUnique({
        where: {
            orderNumber: orderNumber,
        },
        include: {
            orderLineItems: true
        }
    }) as OrderWithLineItems

    if(!order) throw new errorResponse.NotFound('Order not found')
    return order
}


const updateOrderStatus = async (orderId:number,status:string)=>{
    if(!Object.values(OrderStatus).includes(status as OrderStatus))
        throw new errorResponse.ValidationError('Wrong status')

    const order = await prisma.order.update({
        where:{
            id:orderId
        },
        data:{
            status:status
        },
        include:{
            orderLineItems:true
        }
    }) as OrderWithLineItems
    if(!order) throw new errorResponse.ValidationError('Can not update order')
    
    return order
}


const deleteOrder = async (orderId:number)=>{
  
    const order = await prisma.order.delete({
        where:{
            id:orderId
        }
    })
    if(!order) throw new errorResponse.ValidationError('Can not delete order')
    
    return true
}

const findOrdersByCustomerId = async (customerId:number)=>{

    const orders = await prisma.order.findMany({
        where:{
            customerId:customerId
        },
        include:{
            orderLineItems:true
        }
    }) as OrderWithLineItems[]
    if(orders.length<=0) throw new errorResponse.ValidationError('Can not find any order with this customerId')
        
    return orders
}

export const OrderRepository: OrderRepositoryType = {
    createOrder,
    findOrder,
    findOrderByOrderNumber,
    updateOrderStatus,
    deleteOrder,
    findOrdersByCustomerId
}