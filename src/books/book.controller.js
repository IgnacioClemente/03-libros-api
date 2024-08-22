import prisma from "../../prisma/prismaClient.js";

export const getBooks = async (req,res) =>{
    try{
        const books = await prisma.book.findMany();
        res.json(books);
    }catch (error){
        res.status(500).json({error: 'Error al obtener libros'});
    }
};

export const getBook = async (req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const book = await prisma.book.findUniqueOrThrow({where:{id}})
        res.json(book);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el libro'});
    }
};

export const createBook = async (req,res) => {
    try {
        const {title, year, publisher} = req.body
        const book = await prisma.book.create({
            data: {
            title,
            year,
            publisher,
        }});
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({error: 'Error al crear libro'});
    }
};