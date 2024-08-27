import express from 'express';
import { createBook, deleteBook, getBook, getBooks, updateBook } from './book.controller.js';

const router = express.Router();

router.get('/book', getBooks);
router.get('/book/:id', getBook);
router.post('/book', createBook);
router.patch('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

export default router;