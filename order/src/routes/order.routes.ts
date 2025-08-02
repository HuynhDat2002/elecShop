import asyncHandler from '@/helpers/asyncHandler.helper';
import { OrderEvent } from '@/types';
import { MessageBroker } from '@/utils';
import express, { Request, Response, NextFunction, Express } from 'express';
import { RequestAuthorizer } from './middleware.routes';
import { errorResponse } from '@/utils';
import { orderService } from '@/service';
import { orderRepository,cartRepository } from '@/repository';
import { OrderStatus } from '@/types/order.type';
const router = express.Router();

const repo = orderRepository.OrderRepository
const cartRepo = cartRepository.CartRepository
router.post('/',RequestAuthorizer, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(!user){
        throw new errorResponse.NotFound('User not found')
    }
    const response = await orderService.CreateOrder(user.id,repo,cartRepo)
    return res.status(200).json(response)
}))


router.get('/:id', RequestAuthorizer, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(!user){
        throw new errorResponse.NotFound('User not found')
    }
    const response = await orderService.GetOrder(parseInt(req.params.id),repo)
    return res.status(200).json(response)
}))

router.get('/:id/checkout', RequestAuthorizer, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(!user){
        throw new errorResponse.NotFound('User not found')
    }
    const response = await orderService.CheckoutOrder(parseInt(req.params.id),repo)
    return res.status(200).json(response)
}))
router.get('/',RequestAuthorizer, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(!user){
        throw new errorResponse.NotFound('User not found')
    }
    const response = await orderService.GetOrders(user.id,repo)
    return res.status(200).json(response)
}))

router.patch('/update/:id',RequestAuthorizer, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(!user){
        throw new errorResponse.NotFound('User not found')
    }
    const status = req.body.status as OrderStatus
    const response = await orderService.UpdateOrder(parseInt(req.params.id),status,repo)
    return res.status(200).json(response)
}))

router.delete('/:id',RequestAuthorizer, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(!user){
        throw new errorResponse.NotFound('User not found')
    }
    const response = await orderService.DeleteOrder(user.id,repo)

    return res.status(200).json(response)
}))
export default router