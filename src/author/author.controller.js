import prisma from "../../prisma/prismaClient.js";

export const getAuthors = async (req,res) =>{
    try{
        const author = await prisma.author.findMany();
        res.json(author);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el autor'});
    }
};

export const getAuthor = async (req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const author = await prisma.author.findUniqueOrThrow({where:{id}})
        res.json(author);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el autor'});
    }
};

export const createAuthor = async (req,res) => {
    try {
        const {firstName, lastName, nationality, dateOfBirth} = req.body
        const author = await prisma.author.create({
            data: {
            firstName,
            lastName,
            nationality,
            dateOfBirth: new Date(dateOfBirth)
        }});
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({error: 'Error al crear autor'});
    }
};

export const updateAuthor = async (req,res) => {
    const id = parseInt(req.params.id);
    const {firstName, lastName, nationality,dateOfBirth} = req.body
    try {
        const authorUpdate = await prisma.author.update({
            where: {id}, 
            data:  {
                ...(firstName && {firstName}),
                ...(lastName &&  {lastName}),
                ...(nationality && {nationality}),
                ...(dateOfBirth && {dateOfBirth: new Date(dateOfBirth)})
            }
        });
        if(!authorUpdate){
            throw new Error();
        }
        res.json(authorUpdate);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar autor'});
    }
};

export const deleteAuthor = async (req,res) =>{
    const id = parseInt(req.params.id);
    try {
        const authorDelete = await prisma.author.delete({where:{id}});
        res.json(authorDelete);
    } catch (error) {
        res.status(204).json({error: 'Error al borrar el autor'});
    }
};