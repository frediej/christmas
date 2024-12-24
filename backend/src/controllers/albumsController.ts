import { RequestHandler } from 'express';
import db from '../db';

/**
 * Define the row shapes for your queries so TypeScript knows what to expect.
 */
interface AlbumRow {
    id: number;
    name: string;
}

interface PhotoRow {
    path: string;
}

interface AlbumIdRow {
    id: number;
}

/**
 * GET /api/albums
 * Returns all albums with their photos.
 */
export const getAlbums: RequestHandler = (req, res) => {
    // Query for albums, returns an array of { id, name }
    const albums = db
        .prepare<[], AlbumRow>('SELECT id, name FROM albums')
        .all();

    // For each album, fetch its photos
    const result = albums.map((album: AlbumRow) => {
        const photos = db
            .prepare<[number], PhotoRow>('SELECT path FROM photos WHERE albumId=?')
            .all(album.id);

        return {
            name: album.name,
            photos: photos.map((p: PhotoRow) => p.path),
        };
    });

    return res.json(result);
};

/**
 * POST /api/albums
 * Create a new album by name.
 */
export const createAlbum: RequestHandler = (req, res) => {
    // Safely extract "name" from req.body
    const { name } = req.body as { name?: string };
    if (!name) {
        return res.status(400).json({ error: 'Album name is required' });
    }

    try {
        db.prepare('INSERT INTO albums (name) VALUES (?)').run(name);
        return res.status(201).json({ success: true });
    } catch {
        // e.g. unique constraint if album already exists
        return res.status(400).json({ error: 'Album already exists' });
    }
};

/**
 * POST /api/albums/:albumName/photos
 * Upload one or more photos to the specified album.
 * Expects multipart form data with 'photos' or 'photo' fields.
 */
export const uploadPhotos: RequestHandler = (req, res) => {
    const { albumName } = req.params;

    // Query for the album's ID
    const album = db
        .prepare<[string], AlbumIdRow>('SELECT id FROM albums WHERE name=?')
        .get(albumName);

    if (!album) {
        return res.status(404).json({ error: 'Album not found' });
    }

    // Ensure Multer files exist and are an array
    if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    // Insert each photo into the "photos" table
    for (const file of req.files as Express.Multer.File[]) {
        db.prepare('INSERT INTO photos (albumId, path) VALUES (?, ?)')
            .run(album.id, `uploads/${file.filename}`);
    }

    return res.json({ success: true });
};
