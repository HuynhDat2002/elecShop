import express,{Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.init';
import bcrypt from 'bcrypt';
import asyncHandler from '../helpers/asyncHandle.helpers';
const router = express.Router();


const createToken = (payload:any)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET as string,{expiresIn:'1d'})
}

router.post('/register',asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const {username,password,email} = req.body;
    const userExits = await prisma.user.findUnique({where:{email:email}})
    if(userExits){
        res.status(400).json({message:'User already exists'})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = await prisma.user.create({
        data:{
            name:username,
            password:hashPassword,
            email:email
        }
    })
    if(!newUser){
        res.status(400).json({message:'User can not be create'})
    }

    res.status(201).json({message:'User created successfully'})
}))

router.post('/login',asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const {email,password} = req.body;
    const userExits = await prisma.user.findUnique({where:{email:email}})
    if(!userExits){
        // res.status(400).json({message:'User not found'})
        throw new Error('User not found')
    }

    const isPasswordValid = await bcrypt.compare(password,userExits.password)
    if(!isPasswordValid){
        // res.status(400).json({message:'Invalid password'})
        throw new Error('Invalid password')
    }
    const token = createToken({id:userExits.id,email:userExits.email})
    res.status(201).json({message:'User login successfully',token})
}))

router.get('/validate',asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers["authorization"];
    console.log('token',token)
    if(!token){
        throw new Error('Unauthorized')
    }
    try{
    //     const tokenData = token.split(" ")[1]
    // console.log('tokenData',tokenData)

        const user  = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string) as jwt.JwtPayload
        if(!user){
            throw new Error('Unauthorized')
        }
        res.status(200).json({ ...user })
    }
    catch (error){
        throw new Error('Invalid token')
    }
}))

export default router