import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, getUserByName, updateUser } from './user.controller.js';

const router = express.Router();

router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/user/:email', getUserByName);

export default router;