import express from 'express';
import {loginLocalUserController} from './auth.controller.js';

const router = express.Router();

router.post('/login', loginLocalUserController);

export default router;