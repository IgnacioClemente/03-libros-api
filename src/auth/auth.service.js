import prisma from "../../prisma/prismaClient.js";
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import jwt from 'jsonwebtoken';

export const loginLocalUser = async (email, password) =>{
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                email, 
                deletedAt: null
            }
        });
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck){
            throw new Error();
        }
        const accessToken = jwt.sign({ email: user.email}, process.env.APIBOOK_JWT_PASSWORD, {
            expiresIn: process.env.APIBOOK_JWT_TIME
        });
        return accessToken;     
}