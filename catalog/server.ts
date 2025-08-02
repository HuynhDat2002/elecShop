import express,{Express} from 'express'
import userApp from './src/app'
import 'module-alias/register';
import {logger} from './src/utils'
import 'dotenv/config';
const PORT = process.env.PORT;
export const StartServer = async ()=>{
    const app = express();
    userApp(app)
    app.listen(PORT, ()=>{
        logger.info(`Server is up on port ${PORT}`);
    })

    process.on('uncaughtException',async (err)=>{
        logger.error(err);
        process.exit(1)
    })
}

StartServer().then(()=>{
    logger.info(`Server started successfully`)
})

