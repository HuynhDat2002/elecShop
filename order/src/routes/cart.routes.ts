import asyncHandler from '../helpers/asyncHandler.helper';
import express, { Request, Response, NextFunction, Express } from 'express';
import { cartService } from '../service';
import { cartRepository } from '../repository';
import { ValidateRequest } from '../utils/validator';
import { CartRequestInput, CartRequestSchema } from '@/dto/cartRequest.dto';
import { errorResponse } from '../utils';
const router = express.Router();
import { RequestAuthorizer } from './middleware.routes';
const repo = cartRepository.CartRepository


router.post('/', RequestAuthorizer, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
        throw new errorResponse.AuthorizeError('User not authorized')
    }
    const err = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
    )
    if (err) {
        throw new Error(err)
    }
    const response = await cartService.CreateCart({ ...req.body as CartRequestInput, customerId: user.id }, repo)
    return res.status(200).json(response)
}))


router.get(
    '/',
    RequestAuthorizer,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) {
            throw new errorResponse.AuthorizeError('User not authorized')
        }
        const response = await cartService.GetCart(user.id, repo)
        return res.status(200).json(response)
    })
)

router.patch('/:id', RequestAuthorizer, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
        throw new errorResponse.AuthorizeError('User not authorized')
    }
    const itemId = req.params.id
    const response = await cartService.EditCart(
        {
            id: +itemId,
            qty: req.body.qty,
            customerId:user.id
        }
        , repo)
    return res.status(200).json(response)
}))

router.delete('/:id', RequestAuthorizer, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
        throw new errorResponse.AuthorizeError('User not authorized')
    }
    const itemId = req.params.id

    const response = await cartService.DeleteCart({id:+itemId,customerId:user.id}, repo)
    return res.status(200).json(response)
}))
export default router