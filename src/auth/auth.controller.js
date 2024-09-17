import prisma from "../../prisma/prismaClient.js";
import bcrypt from 'bcryptjs'

export const loginLocalUser = async (req, res) => {
    try {
        const {email, password} = req.body;
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
        res.status(500).json({msg: 'Login true'});
    } catch (error) {
        res.status(500).json({msg: 'Login false'});
    }
}