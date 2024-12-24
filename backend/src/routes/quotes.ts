import { Router } from 'express';
import { getQuoteForToday } from '../controllers/quotesController';

const router = Router();

router.get('/daily', getQuoteForToday);

export default router;
