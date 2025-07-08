import express,{Request,Response,NextFunction} from 'express';
import asyncHandler from '@/helpers/asyncHandler.helper';
import { RequestAuthorizer } from './middleware.routes';
import { ValidationError } from '@/utils/error/errors';
import { paymentService } from '@/services';
import { PaymentGateway, StripePayment } from '@/utils';
const paymentGateway:PaymentGateway =StripePayment

const router = express.Router()

router.post(
    '/create-payment',
    RequestAuthorizer,
    asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
        const user = req.user
        if(!user){
            throw new ValidationError("User not found")
        }

        const orderNumber = parseInt(req.body.orderNumber)
        const response = await paymentService.CreatePayment(user.id, orderNumber,paymentGateway)
        


        return res.status(200).json({message:"Payment successful"})
    }
))

router.get(
    '/verify-payment/:id',
    RequestAuthorizer,
    asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
        const user = req.user
        if(!user){
            throw new ValidationError("User not found")
        }

        const paymentId:string = req.params.paymentId
        if(!paymentId){
            throw new ValidationError("PaymentId not found")
        }

       
        const response = await paymentService.VerifyPayment(paymentId,paymentGateway)
        


        return res.status(200).json({message:"Payment verification successful"})
    }
))
export default router