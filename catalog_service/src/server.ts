import express,{Express} from 'express'
import userApp from './app'
import 'module-alias/register';
import {logger} from './utils'
const PORT = 5000;
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

