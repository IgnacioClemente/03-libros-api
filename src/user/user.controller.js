import prisma from "../../prisma/prismaClient.js";
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req,res) =>{
    try{
        const users = await prisma.user.findMany({
        select:{
            id: true,
            firstName: true,
            lastName: true,
            email: true
        },
        where: {deletedAt:null}
    });
    res.status(200).json(users);
    }catch (error){
        res.status(500).json({ msg: 'Error al obtener los usuarios' });
    }
};

export const getUserById = async (req,res) =>{
    try{
        const id = parseInt(req.params.id);
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
    if(!user){
        return res
        .status(404)
        .json({ msg: 'No se encontro al usuario ingresado' });
    }
    res.status(200).json(user);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el usuario'});
    }
};

export const createUser = async (req,res) => {
    try {
        const {firstName, lastName, email, password} = req.body
        const passwordBcrypt = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            email: email.toLowerCase(),
            password: passwordBcrypt
        }});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({error: 'Error al crear usuario'});
    }
};

export const updateUser = async (req,res) => {
    try {
        const id = parseInt(req.params.id);
        if (!existUser(id)) {
			return res.status(404).json({ msg: 'Usuario no encontrado' });
		}
        const {firstName, lastName, password} = req.body
        const passwordBcrypt = await bcrypt.hash(password, 10);
        const userUpdate = await prisma.user.update({
            where: {id}, 
            data:  {
                ...(firstName && {firstName: firstName.toLowerCase()}),
                ...(lastName &&  {lastName: lastName.toLowerCase()}),
                ...(password && {password: passwordBcrypt}),
            }
        });
        if(!userUpdate){
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(userUpdate);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el usuario' });
    }
};

export const deleteUser = async (req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const userCheck = await existUser(id);

        if (!userCheck) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const userDelete = await prisma.user.update({
        where:{id},
        data: {deletedAt: new Date()}
    });
		res.status(200).json({ msg: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(204).json({error: 'Error al borrar el usuario'});
    }
};

export const existUser = async (id) => {
    try{
        const existUser = await prisma.user.findUnique({
            where: {id, deletedAt: null}
        });

        if(!existUser){
            return false;
        }
        return true;
    }catch(error){
        return false;
    }
};