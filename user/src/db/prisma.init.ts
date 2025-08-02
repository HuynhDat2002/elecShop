import {PrismaClient} from '@prisma/client'

export const prisma = new PrismaClient();

export const connectDB = async ()=>{
    try{
        await prisma.$connect()
        console.log('Connected to Prisma successfully')
    }
    catch (err){
        await prisma.$disconnect()
        console.log('Cannot connect to Prisma', err)
        process.exit()
    }
}