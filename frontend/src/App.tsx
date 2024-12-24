// frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// MUI imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';

// Pages
import Home from './pages/Home';
import Albums from './pages/Albums';
import Spotify from './pages/Spotify';

// Create a custom MUI theme with purple as primary
const theme = createTheme({
    palette: {
        primary: {
            main: '#673ab7', // Purple
        },
        secondary: {
            main: '#ff9800', // Orange accent
        },
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                {/* MUI AppBar for the Navbar */}
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            My Special Website
                        </Typography>
                        {/* Use MUI Button + Link for navigation */}
                        <Button component={Link} to="/" color="inherit">
                            Home
                        </Button>
                        <Button component={Link} to="/albums" color="inherit">
                            Albums
                        </Button>
                        <Button component={Link} to="/spotify" color="inherit">
                            Spotify
                        </Button>
                    </Toolbar>
                </AppBar>

                {/* Main content container */}
                <Container sx={{ mt: 4 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/albums" element={<Albums />} />
                        <Route path="/spotify" element={<Spotify />} />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
};

export default App;
