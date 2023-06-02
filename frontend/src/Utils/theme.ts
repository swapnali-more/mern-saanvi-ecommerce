import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#be9a9a', // Replace with your primary color
        },
        secondary: {
            main: '#212121', // Replace with your secondary color
        },
    },
    typography: {
        // Customize typography here
        fontFamily: 'Poppins, sans-serif',
        fontSize: 14,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontSize: '3rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2.4rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h4: {
            fontSize: '1.6rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h5: {
            fontSize: '1.4rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h6: {
            fontSize: '1.2rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        body2: {
            fontSize: '1.2rem',
            fontWeight: 400,
            lineHeight: 1.2,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.2,
        }
        // Add more typography styles as needed
    },
    spacing: 8, // Customize spacing here
    breakpoints: {
        // Customize breakpoints here
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                // Customize text color here
                root: {
                    color: '#333333',
                    fontFamily: 'Poppins, sans-serif',
                },
            },
        },
    },
});

export default theme;
