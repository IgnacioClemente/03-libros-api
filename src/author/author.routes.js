import express from 'express';
import { createAuthor, deleteAuthor, getAuthor, getAuthors, updateAuthor } from './author.controller.js';

const router = express.Router();

router.get('/author', getAuthors);
router.get('/author/:id', getAuthor);
router.post('/author', createAuthor);
router.patch('/author/:id', updateAuthor);
router.delete('/author/:id', deleteAuthor);

export default router;