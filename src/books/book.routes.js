import express from 'express';
import { createBookController, deleteBookController, getAllBooksController, getBookController, updateBookController } from './book.controller.js';
import { isAuthenticated } from '../../middlerwares/auth-middleware.js';

const router = express.Router();

router.get('/book', getAllBooksController);
router.get('/book/:id', getBookController);
router.post('/book', isAuthenticated, createBookController);
router.patch('/book/:id', isAuthenticated, updateBookController);
router.delete('/book/:id', isAuthenticated, deleteBookController);

export default router;