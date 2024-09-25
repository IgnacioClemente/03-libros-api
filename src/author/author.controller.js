import { createAuthor, deleteAuthor, getAuthor, getAuthors, updateAuthor } from "./author.service.js";

export const getAuthorsController = async (req,res) =>{
    try{
        const author = await getAuthors();
        res.json(author);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el autor'});
    }
};

export const getAuthorController = async (req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const author = await getAuthor(id);
        res.json(author);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el autor'});
    }
};

export const createAuthorController = async (req,res) => {
    try {
        const author = await createAuthor(req.body);
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({error: 'Error al crear autor'});
    }
};

export const updateAuthorController = async (req,res) => {
    const id = parseInt(req.params.id);
    try {
        const author = await updateAuthor(id, req.body);
        if(!author){
            throw new Error();
        }
        res.json(author);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar autor'});
    }
};

export const deleteAuthorController = async (req,res) =>{
    const id = parseInt(req.params.id);
    try {
        const author = await deleteAuthor(id);
        res.json(author);
    } catch (error) {
        res.status(204).json({error: 'Error al borrar el autor'});
    }
};