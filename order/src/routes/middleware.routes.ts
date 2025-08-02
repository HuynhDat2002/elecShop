import {errorResponse, ValidateUser} from '../utils'
import {Request,Response,NextFunction} from 'express'

export const RequestAuthorizer = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const token = req.headers.authorization as string
        if(!token) throw new errorResponse.AuthorizeError('Token Invalid')
        const userData = await ValidateUser(token)
        if(!userData) throw new errorResponse.AuthorizeError('User not authorized')
        req.user = userData
        next()
    }
    catch(err){
        next(err)
    }
}

