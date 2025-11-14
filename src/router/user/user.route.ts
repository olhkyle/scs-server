import express from 'express';
import { getUsers } from './user.service';

const router = express.Router();

router.get('/api/users', getUsers);

export default router;
