import express,{Express} from 'express'
import expressApp from './app'
import 'module-alias/register';
import {logger} from './utils'
const PORT = 9000;
export const StartServer = async ()=>{
    const app = express();
    expressApp(app)
    app.listen(PORT, ()=>{
        logger.info(`Server is up on port ${PORT}`);
    })

    process.on('uncaughtException',async (err)=>{
        logger.error(err);
        process.exit(1)
    })
}

StartServer()

