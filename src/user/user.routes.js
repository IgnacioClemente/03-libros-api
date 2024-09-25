import express from 'express';
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from './user.controller.js';

const router = express.Router();

router.get('/user', getAllUsersController);
router.get('/user/:id', getUserByIdController);
router.post('/user', createUserController);
router.patch('/user/:id', updateUserController);
router.delete('/user/:id', deleteUserController);

export default router;