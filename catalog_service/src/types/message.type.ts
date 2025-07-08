export interface OrderWithLineItems{
    id?:number;
    orderNumber:number 
    orderLineItems:OrderLineItems[]

}

export type OrderLineItems = {
    id:number
    productId:number
    qty:number
}