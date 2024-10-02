import prisma from "../../prisma/prismaClient.js";
import bcrypt from 'bcryptjs';
import { existUser } from "./user.controller.js";

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select:{
            id: true,
            firstName: true,
            lastName: true,
            email: true
        },
        where: {deletedAt:null}
    });

    return users;
}

export const getUserById = async (id) => {
    const user = await prisma.user.findUniqueOrThrow({
        select:{
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            deletedAt: true,
            updatedAt: true,
            createAt: true
    },
        where:{id, deletedAt: null}
    });
    
    return user;     
}

export const createUser = async (user) => {
    const {firstName, lastName, email, password} = user;
    const passwordBcrypt = await bcrypt.hash(password, 10);
    const user_Create = await prisma.user.create({
        data: {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        password: passwordBcrypt
    }});

    return user_Create;
}

export const updateUser = async (id,user) => {
        const {firstName, lastName, password} = user;
        const passwordBcrypt = await bcrypt.hash(password, 10);
        const userUpdate = await prisma.user.update({
            where: {id}, 
            data:  {
                ...(firstName && {firstName: firstName.toLowerCase()}),
                ...(lastName &&  {lastName: lastName.toLowerCase()}),
                ...(password && {password: passwordBcrypt}),
            }
        });
        return userUpdate;
}

export const deleteUser = async (id) =>{
    const userExist = await existUser(id);
    const userDelete = await prisma.user.update({
        where:{id},
        data: {deletedAt: new Date()}
    });
    return userDelete;
}

export const getUserByEmail = async (email) =>{
    const user = await prisma.user.findUniqueOrThrow({where:{email}})
    return user;
}