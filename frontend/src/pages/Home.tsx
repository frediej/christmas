// frontend/src/pages/Home.tsx

import React, { useEffect, useState } from 'react';
import { fetchDailyQuote, fetchMessages, postMessage } from '../services/api';
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

interface Message {
    sender: string;
    text: string;
    date: string;
}

const Home: React.FC = () => {
    const [quote, setQuote] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [sender, setSender] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        // Fetch daily quote
        fetchDailyQuote().then((data) => setQuote(data.quote));

        // Fetch messages
        loadMessages();
    }, []);

    const loadMessages = () => {
        fetchMessages().then((data) => setMessages(data));
    };

    const handleMessageSubmit = async () => {
        if (!sender || !text) return;
        await postMessage(sender, text);
        setSender('');
        setText('');
        loadMessages();
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome!
            </Typography>

            <Typography variant="h6" gutterBottom>
                Today's Quote:
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 3 }}>
                {quote}
            </Typography>

            <Typography variant="h6" gutterBottom>
                Daily Messages
            </Typography>
            <List>
                {messages.map((msg, idx) => (
                    <ListItem key={idx} sx={{ p: 0 }}>
                        <ListItemText
                            primary={`${msg.sender}: ${msg.text}`}
                            secondary={new Date(msg.date).toLocaleString()}
                        />
                    </ListItem>
                ))}
            </List>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <TextField
                    label="Your name"
                    variant="outlined"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                />
                <TextField
                    label="Your message"
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button variant="contained" onClick={handleMessageSubmit}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
