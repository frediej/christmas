import { RequestHandler } from 'express';
import db from '../db';

/**
 * The row shape for quotes. Just a single field "text" in each row.
 */
interface QuoteRow {
    text: string;
}

/**
 * GET /api/quotes/daily
 * Returns a quote for today. If it's a special day, return a special message.
 */
export const getQuoteForToday: RequestHandler = (req, res) => {
    // 1) Check if it's a special day
    const now = new Date();
    const month = now.getMonth() + 1; // 1-based month (Jan=1, Dec=12)
    const day = now.getDate();

    // Christmas: Dec 25
    if (month === 12 && day === 25) {
        return res.json({ quote: 'Merry Christmas, my love!' });
    }

    // New Year: Jan 1
    if (month === 1 && day === 1) {
        return res.json({ quote: 'Happy New Year, baby!' });
    }

    // Girlfriend's Birthday: June 12
    if (month === 6 && day === 12) {
        return res.json({ quote: 'Happy Birthday, my beautiful girl!' });
    }

    // Anniversary: Sept 16
    if (month === 9 && day === 16) {
        return res.json({ quote: 'Happy Anniversary! I love you so much!' });
    }

    // Monthaversary: 16th of ANY month (except it might overlap with Anniversary above)
    if (day === 16) {
        return res.json({ quote: 'Happy Monthaversary, baby!' });
    }

    // 2) Not a special day -> fetch rotating quote from DB
    const rows = db.prepare<[], QuoteRow>('SELECT text FROM quotes').all();
    if (rows.length === 0) {
        return res.json({ quote: 'No quotes found in DB' });
    }

    // Example: use day of month to pick from the array
    const dayIndex = day % rows.length;
    const quote = rows[dayIndex].text;

    return res.json({ quote });
};
