import React, { useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
} from '@mui/material';

const Spotify: React.FC = () => {
    // Put your multiple playlist IDs in an array
    const [playlists, setPlaylists] = useState<string[]>([
        '6ZfxKHm86MmlB0CKMJSFoN?si=317aac0e3caf4ec4',   // Example 1
        '1VbfmuwYElfCC1DyGHQ3qp?si=0874820a2d9e4c2e',   // Example 2
        '16vDM0cEfqGY0zMDUdXpKo?si=30ab62caf66242e4'
        // Add as many as you want
    ]);
    // Input field for adding a new playlist
    const [playlistIdInput, setPlaylistIdInput] = useState('');

    const handleAddPlaylist = () => {
        const trimmed = playlistIdInput.trim();
        if (!trimmed) return;
        // Type prev as string[]
        setPlaylists((prev: string[]) => [...prev, trimmed]);
        setPlaylistIdInput('');
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Spotify Playlists
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <TextField
                    label="Enter Spotify playlist ID"
                    value={playlistIdInput}
                    onChange={(e) => setPlaylistIdInput(e.target.value)}
                />
                <Button variant="contained" onClick={handleAddPlaylist}>
                    Add Playlist
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {playlists.map((id, index) => (
                    <Card key={index} variant="outlined" sx={{ width: 320 }}>
                        <CardContent>
                            <iframe
                                src={`https://open.spotify.com/embed/playlist/${id}`}
                                width="300"
                                height="380"
                                frameBorder="0"
                                allow="encrypted-media"
                            ></iframe>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                If the embed doesn’t play,&nbsp;
                                <a
                                    href={`https://open.spotify.com/playlist/${id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    open in Spotify
                                </a>
                                .
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Spotify;
