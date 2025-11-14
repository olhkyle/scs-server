import express from 'express';
import { checkAuth, signIn, signOut, signUp } from './auth.service';

const router = express.Router();

router.get('/api/auth', checkAuth);

router.post('/api/signin', signIn);

router.post('/api/signup', signUp);

router.post('/api/signout', signOut);

export default router;
