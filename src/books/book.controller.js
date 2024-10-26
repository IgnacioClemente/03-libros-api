import { createBook, deleteBook, getAllBooks, getBook, updateBook } from "./book.service.js";

export const getAllBooksController = async (req,res) =>{
    try{
        const books = await getAllBooks();
        res.json(books);
    }catch (error){
        res.status(500).json({error: 'Error al obtener libros'});
    }
};

export const getBookController = async (req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const book = await getBook(id);
        res.json(book);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el libro'});
    }
};

export const createBookController = async (req,res) => {
	try {
		const book = await createBook(req.body);
		res.status(201).json(book);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error al crear libro' });
	}
};

export const updateBookController = async (req,res) => {
    try {
        const id = parseInt(req.params.id);
        const book = await updateBook(id,req.body)
        res.json(book);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar'});
    }
};

export const deleteBookController = async (req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const book = deleteBook(id);
        res.status(201).json(book);
    } catch (error) {
        res.status(204).json({error: 'Error al borrar libro'});
    }
};