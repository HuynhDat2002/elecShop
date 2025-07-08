import { Request, Response, NextFunction } from 'express'
import * as errorCustom from './errors'
import { NotFound, ValidationError, AuthorizeError, ForbiddenError } from './errors'

import { logger } from '../logger'

export const HandleErrorWithLogger = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
  
    const status:number = error.status || 500;
    // logger.error(error)

    res.status(status).json({
        status:status,
        message:error.message,
        stack:error.stack
    })

}

export const HandleUnCaughtException = async (error: Error) => {
    logger.error(error)
    process.exit(1)
}