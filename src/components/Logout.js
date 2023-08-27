import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                WeBank
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Logout() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box>
                    <Container maxWidth="sm">
                        <Typography
                            component="h3"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            You are logged out
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Thank You for Using Our Application.
                        </Typography>
                    </Container>
                </Box>
            </main>
            {/* Footer */}
            <Box component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    WeBank
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    We For You!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}