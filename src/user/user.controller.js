import prisma from "../../prisma/prismaClient.js";

export const getAllUsers = async (req,res) =>{
    try{
        const user = await prisma.user.findMany();
        res.json(user);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el usuario'});
    }
};

export const getUserById = async (req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const user = await prisma.user.findUniqueOrThrow({where:{id}})
        res.json(user);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el usuario'});
    }
};

export const createUser = async (req,res) => {
    try {
        const {firstName, lastName, email, password} = req.body
        const user = await prisma.user.create({
            data: {
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            email: email.toLowerCase(),
            password
        }});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({error: 'Error al crear usuario'});
    }
};

export const updateUser = async (req,res) => {
    const id = parseInt(req.params.id);
    const {firstName, lastName, password} = req.body
    try {
        const userUpdate = await prisma.user.update({
            where: {id}, 
            data:  {
                ...(firstName && {firstName}),
                ...(lastName &&  {lastName}),
                ...(password && {password}),
            }
        });
        if(!userUpdate){
            throw new Error();
        }
        res.json(userUpdate);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar usuario'});
    }
};

export const deleteUser = async (req,res) =>{
    const id = parseInt(req.params.id);
    try {
        const userDelete = await prisma.user.delete({where:{id}});
        res.json(userDelete);
    } catch (error) {
        res.status(204).json({error: 'Error al borrar el usuario'});
    }
};

export const getUserByName = async (req,res) =>{
    try{
        const email = parseInt(req.params.email);
        const user = await prisma.user.findUniqueOrThrow({where:{email}})
        res.json(user);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el usuario'});
    }
};