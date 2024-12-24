import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import messagesRouter from './routes/messages';
import quotesRouter  from './routes/quotes';
import albumsRouter from './routes/albums';
import spotifyRouter from './routes/spotify';
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (for uploaded images) from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Routes
app.use('/api/messages', messagesRouter);
app.use('/api/quotes', quotesRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/spotify', spotifyRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
