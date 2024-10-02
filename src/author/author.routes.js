import express from 'express';
import { createAuthorController, deleteAuthorController, getAuthorController, getAuthorsController, updateAuthorController } from './author.controller.js';
import { isAuthenticated } from '../../middlerwares/auth-middleware.js';

const router = express.Router();

router.get('/author', getAuthorsController);
router.get('/author/:id', getAuthorController);
router.post('/author', isAuthenticated, createAuthorController);
router.patch('/author/:id', isAuthenticated, updateAuthorController);
router.delete('/author/:id', isAuthenticated, deleteAuthorController);

export default router;