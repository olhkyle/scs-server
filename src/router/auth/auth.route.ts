import express from 'express';
import { checkAuth, signIn, signUp } from './auth.service';

const router = express.Router();

router.get('/auth', checkAuth);

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/signout', () => {});

export default router;
