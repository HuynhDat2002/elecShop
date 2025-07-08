import express ,{Request,Response,NextFunction,Express} from 'express';
import 'module-alias/register';
// import router from './routes';
// import { connectDB } from './db/prisma.init';
import { HandleErrorWithLogger,httpLogger } from './utils';
import 'dotenv/config'
import {paymentRouter} from '@/routes' 
import cors from 'cors'
import { MessageBroker } from './utils';
import { Consumer, Producer } from 'kafkajs';
import { InitializeBroker } from '@/services/broker.service';

const expressApp = async (app:Express)=>{

    app.use(express.json())
    app.use(cors({origin:"*"}))
    console.log('app')

    // await connectDB()
    app.use(httpLogger)
    
    await InitializeBroker()

    app.use("/api/",paymentRouter)
        
     //handling error notfound
     app.use((req:Request,res:Response,next:NextFunction)=>{
        const error:any = new Error('Not found')
        error.status = 404
        next(error)
    })
    
   // handling error
    // app.use((error:any,req:Request,res:Response,next:NextFunction)=>{
    //     const status:number = error.status || 500;
    //     res.status(status).json({
    //         status:status,
    //         message:error.message,
    //         stack:error.stack
    //     })
    // })
    app.use(HandleErrorWithLogger)
}
export default expressApp