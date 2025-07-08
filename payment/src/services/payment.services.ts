'use strict'

import { errorResponse, GetOrderDetails } from "@/utils"
import { PaymentGateway } from "@/utils/payment"
import { SendPaymentUpdateMessage } from "./broker.service"

export const CreatePayment = async (
    userId:number,orderNumber:number,paymentGateway:PaymentGateway
)=>{

    //get order details from order service
    const order = await GetOrderDetails(orderNumber)
    if(order.customerId!==userId){
        throw new errorResponse.AuthorizeError("User not authorized to create payment")
    }

    console.log("order details", order)

    
    // create a new payment record
    const amountInCents  = order.amount*100
    const orderMetaData={
        orderNumber:order.orderNumber,
        userId:userId 
    }

    // call payment gateway to create payment
    const paymentResponse = await paymentGateway.createPayment(amountInCents, orderMetaData)
    console.log("payment response", paymentResponse)
    //amount has to be fetch from the order service

    return {
        secret:paymentResponse.secret,
        pubKey:paymentResponse.pubKey,
        amount:amountInCents,
        order:order
    }
}

export const VerifyPayment = async (paymentId:string, paymentGateway:PaymentGateway)=>{
    // call payment Gateway to verify payment
    const paymentResponse = await paymentGateway.getPayment(paymentId)

    console.log("payment response", paymentResponse)


    //update order status through message broker
   const response = await SendPaymentUpdateMessage({
        status:paymentResponse.status,
        orderNumber:paymentResponse.orderNumber,
        paymentLog:paymentResponse.paymentLog,
    })

    console.log("response from message broker", response)
    
    //reuturn payment status <= not nacecessary just for response to frontend 
    return {
        message:"Payment verified",
        status:paymentResponse.status,
        paymentLog:paymentResponse.paymentLog
    }
}