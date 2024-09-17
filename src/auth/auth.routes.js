import express from 'express';
import {loginLocalUser} from './auth.controller.js';

const router = express.Router();

router.post('/login', loginLocalUser);

export default router;