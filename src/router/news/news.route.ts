import express from 'express';
import { getNewsList, addNews, deleteNews } from './news.controller';

const router = express.Router();

router.get('/api/news', getNewsList);

router.post('/api/news', addNews);

router.delete('/api/news/:id', deleteNews);

export default router;
