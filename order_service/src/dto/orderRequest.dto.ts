export interface OrderWithLineItems{
    id?:number;
    orderNumber:number
    customerId:number
    txnId: string|null
    amount: number
    status:string
    orderLineItems:OrderLineItems[]
    updatedAt?: Date;
    createdAt?: Date;
}

export type OrderLineItems = {
    id:number
    productId:number
    itemName:string
    qty:number
    price:number
    orderId:number
    updatedAt:Date
    createdAt:Date
}