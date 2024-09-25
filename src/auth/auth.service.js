import prisma from "../../prisma/prismaClient.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const loginLocalUser = async () =>{
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
        const accessToken = jwt.sign({ email: user.email}, 'mipassword01', {
            expiresIn: '1h'
        });
        return accessToken;     
}