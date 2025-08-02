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
    //     let reportError = true
    //     let status = 500
    //     let data = error.message
    //     const errors: (new (...args: any[]) => Error)[] = [
    //         NotFound,
    //         ValidationError,
    //         ForbiddenError
    //     ];
    //     //skip common/ known errors
    //     errors.forEach(
    //         (typeOfError) => {
    //             if (error as any instanceof typeOfError) {
    //                 reportError = false;
    //                 status = error.status;
    //                 data = error.message;
    //             }
    //         }
    //     )

    //     if (reportError) {
    //         logger.error(error)

    //     }
    //     else {
    //         logger.warn(error)
    //     }

    //    res.status(status).json(data)

    const status: number = error.status || 500;
    logger.error(error)

    res.status(status).json({
        status: status,
        message: error.message,
        stack: error.stack
    })


}

export const HandleUnCaughtException = async (error: Error) => {
    logger.error(error)
    process.exit(1)
}