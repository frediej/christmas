import { RequestHandler } from 'express';
import db from '../db';

export const getMessages: RequestHandler = (req, res) => {
    const rows = db.prepare('SELECT * FROM messages ORDER BY date DESC').all();
    return res.json(rows);
};

export const addMessage: RequestHandler = (req, res) => {
    const { sender, text } = req.body;
    if (!sender || !text) {
        return res.status(400).json({ error: 'Sender and text are required' });
    }
    db.prepare('INSERT INTO messages (sender, text, date) VALUES (?, ?, ?)')
        .run(sender, text, new Date().toISOString());
    return res.status(201).json({ success: true });
};
