import express from 'express';
import { signUp, signIn } from './controllers/auth.js';
import { getAll } from './controllers/user.js';
import verifyToken from './Validation/verifyToken.js';
import checkAdmin from './Validation/checkAdmin.js';

const router = express.Router();

// Define routes
router.post('/register', signUp);
router.post('/login', signIn);
router.get('/', verifyToken, checkAdmin, getAll);

export default router;
