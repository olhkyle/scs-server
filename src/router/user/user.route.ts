import express from 'express';
import { getUsers, addUser, deleteUser } from './user.controller';

const router = express.Router();

router.get('/api/users', getUsers);

router.post('/api/users', addUser);

router.delete('/api/user/:id', deleteUser);

export default router;
