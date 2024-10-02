import express from 'express';
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from './user.controller.js';
import { isAuthenticated } from '../../middlerwares/auth-middleware.js';

const router = express.Router();

router.get('/user', getAllUsersController);
router.get('/user/:id', getUserByIdController);
router.post('/user', isAuthenticated, createUserController);
router.patch('/user/:id', isAuthenticated, updateUserController);
router.delete('/user/:id', isAuthenticated, deleteUserController);

export default router;