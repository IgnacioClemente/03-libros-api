import prisma from "../../prisma/prismaClient.js";

export const getAllBooks = async (req,res) =>{
    try{
        const books = await prisma.book.findMany({include: { author: { select: { firstName: true, lastName: true } } }});
        res.json(books);
    }catch (error){
        res.status(500).json({error: 'Error al obtener libros'});
    }
};

export const getBook = async (req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const book = await prisma.book.findUniqueOrThrow({
        where:{id},
        include: { author: { select: { firstName: true, lastName: true } } }
    })
        res.json(book);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el libro'});
    }
};

export const createBook = async (req,res) => {
    try {
        const {title, year, publisher, authorID} = req.body

        const book = await prisma.book.create({
            data: {
            title,
            year,
            publisher,
            authorID
        }});
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({error: 'Error al crear libro'});
    }
};

export const updateBook = async (req,res) => {
    const id = parseInt(req.params.id);
    const title = req.body.title;
    try {
        const bookUpdate = await prisma.book.update({
            where: {id}, 
            data:  {title},
            include: { author: { select: { firstName: true, lastName: true } } }
        });
        if(!bookUpdate){
            throw new Error();
        }
        res.json(bookUpdate);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar'});
    }
};

export const deleteBook = async (req,res) =>{
    const id = parseInt(req.params.id);
    try {
        const bookDelete = await prisma.book.delete({
        where:{id},
        include: { author: { select: { firstName: true, lastName: true } } }
    
    });
        res.json(bookDelete);
    } catch (error) {
        res.status(204).json({error: 'Error al borrar libro'});
    }
};