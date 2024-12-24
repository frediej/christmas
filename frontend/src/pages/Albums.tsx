import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    Select,
    MenuItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Dialog,
    DialogContent,
    CardMedia,
} from '@mui/material';

// MUI Icon for the accordion expand button
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { fetchAlbums, createAlbum, uploadPhotos } from '../services/api';

interface Album {
    name: string;
    photos: string[];
}

const Albums: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [newAlbumName, setNewAlbumName] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState('');
    const [photoFiles, setPhotoFiles] = useState<FileList | null>(null);

    // For viewing enlarged images
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        loadAlbums();
    }, []);

    const loadAlbums = () => {
        fetchAlbums().then((data) => setAlbums(data));
    };

    const handleCreateAlbum = async () => {
        if (!newAlbumName.trim()) return;
        await createAlbum(newAlbumName.trim());
        setNewAlbumName('');
        loadAlbums();
    };

    const handleUploadPhoto = async () => {
        if (!selectedAlbum || !photoFiles || photoFiles.length === 0) return;
        await uploadPhotos(selectedAlbum, photoFiles);

        // Clear input
        setPhotoFiles(null);
        (document.getElementById('photoInput') as HTMLInputElement).value = '';

        loadAlbums();
    };

    /**
     * Called when user clicks on a thumbnail to enlarge it
     */
    const handleImageClick = (photo: string) => {
        setSelectedImage(photo);
        setOpenDialog(true);
    };

    /**
     * Close the dialog
     */
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedImage(null);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Albums
            </Typography>

            {/* Create a new album */}
            <Box sx={{ mb: 3, display: 'flex', gap: 1 }}>
                <TextField
                    label="New album name"
                    value={newAlbumName}
                    onChange={(e) => setNewAlbumName(e.target.value)}
                />
                <Button variant="contained" onClick={handleCreateAlbum}>
                    Create Album
                </Button>
            </Box>

            {/* Upload photos */}
            <Typography variant="h6" gutterBottom>
                Upload Photos
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', gap: 1, alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <Select
                        value={selectedAlbum}
                        displayEmpty
                        onChange={(e) => setSelectedAlbum(e.target.value as string)}
                    >
                        <MenuItem value="">-- Select Album --</MenuItem>
                        {albums.map((album) => (
                            <MenuItem key={album.name} value={album.name}>
                                {album.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" component="label">
                    Select Photos
                    <input
                        id="photoInput"
                        type="file"
                        multiple
                        hidden
                        onChange={(e) => setPhotoFiles(e.target.files)}
                    />
                </Button>

                <Button variant="contained" color="secondary" onClick={handleUploadPhoto}>
                    Upload
                </Button>
            </Box>

            {/* Collapsible albums */}
            {albums.map((album) => (
                <Accordion key={album.name} sx={{ mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{album.name}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {/* Display the photos in a Grid */}
                        <Grid container spacing={2}>
                            {album.photos.map((photo, idx) => (
                                <Grid item xs={4} sm={3} md={2} key={idx}>
                                    <CardMedia
                                        component="img"
                                        src={`http://localhost:5001/${photo}`}
                                        alt="album"
                                        sx={{
                                            width: '100%',
                                            height: '120px',
                                            objectFit: 'cover',
                                            cursor: 'pointer',
                                            border: '1px solid #ccc',
                                        }}
                                        onClick={() => handleImageClick(photo)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Dialog for enlarged image */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
                <DialogContent sx={{ p: 0 }}>
                    {selectedImage && (
                        <img
                            src={`http://localhost:5001/${selectedImage}`}
                            alt="enlarged"
                            style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Albums;
