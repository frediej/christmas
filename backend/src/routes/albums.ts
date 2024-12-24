import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
    getAlbums,
    createAlbum,
    uploadPhotos,
} from '../controllers/albumsController';

// Ensure the "uploads" folder exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer to store files in "uploads" folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
const upload = multer({ storage });

const router = Router();

router.get('/', getAlbums);
router.post('/', createAlbum);

/**
 * For multiple photo upload, use upload.array('photos', <maxCount>)
 * "photos" = name of the field in your form data
 */
router.post('/:albumName/photos', upload.array('photos', 20), uploadPhotos);

export default router;
