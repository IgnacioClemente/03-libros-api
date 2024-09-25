import express from 'express';
import { createBookController, deleteBookController, getAllBooksController, getBookController, updateBookController } from './book.controller.js';

const router = express.Router();

router.get('/book', getAllBooksController);
router.get('/book/:id', getBookController);
router.post('/book', createBookController);
router.patch('/book/:id', updateBookController);
router.delete('/book/:id', deleteBookController);

export default router;