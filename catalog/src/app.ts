import express ,{Request,Response,NextFunction,Express} from 'express';
import 'module-alias/register';
import router from '@/api/catalog.route'
import cors from 'cors'
import {httpLogger,HandleErrorWithLogger} from './utils';
const PORT = 5000;
import { connectDB } from './db';
import { BrokerService } from './services/broker.service';
import { CatalogService } from './services/catalog.service';
import { ElasticSearchService } from './services/elasticsearch.service';
import { AppEventListener } from './utils/AppEventListener';

const userApp = async (app:Express)=>{
    app.use(express.json())
    app.use(cors({
        origin: ['http://localhost:6000/api/cart'],
        methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
        credentials: true, // Cho phép sử dụng credentials mode
    }))

    // connect to db
    connectDB()

    app.use(httpLogger)

    //initialize elasticsearch service
    const elasticSearchService = new ElasticSearchService()
    AppEventListener.instance.listen(elasticSearchService)


    //link to router
    app.use("/api/",router)
    
     //handling error notfound
    app.use((req:Request,res:Response,next:NextFunction)=>{
        const error:any = new Error('Not found')
        error.status = 404
        next(error)
    })
          //handling error
    app.use((error:any,req:Request,res:Response,next:NextFunction)=>{
        const status:number = error.status || 500;
        res.status(status).json({
            status:status,
            message:error.message,
            stack:error.stack
        })
    })
    // app.use(HandleErrorWithLogger);
}
export default userApp