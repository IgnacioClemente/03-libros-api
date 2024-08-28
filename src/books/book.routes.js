import express from 'express';
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from './book.controller.js';

const router = express.Router();

router.get('/book', getAllBooks);
router.get('/book/:id', getBook);
router.post('/book', createBook);
router.patch('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

export default router;