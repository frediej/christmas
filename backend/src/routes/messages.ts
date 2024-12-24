import { Router } from 'express';
import { getMessages, addMessage } from '../controllers/messagesController';

const router = Router();

router.get('/', getMessages);
router.post('/', addMessage);

export default router;
