import { Router } from 'express';

const router = Router();

/**
 * Optional: If you want to do more with Spotify's API, you'd integrate here.
 * For now, let's just respond with a test message or fetch info if you had a token.
 */
router.get('/playlist/:id', (req, res) => {
    const { id } = req.params;
    // Example: return some details about the playlist (stub)
    res.json({ playlistId: id, name: "Sample Playlist" });
});

export default router;
