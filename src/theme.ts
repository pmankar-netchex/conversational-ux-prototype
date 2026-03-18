import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      dark: '#1D4ED8',
    },
    success: {
      main: '#16A34A',
    },
    warning: {
      main: '#FFE44D',
    },
    error: {
      main: '#DC2626',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#757575',
      disabled: '#999999',
    },
    divider: '#E9E9E9',
  },
  typography: {
    fontFamily: '"Source Sans Pro", "Roboto", "Helvetica", "Arial", sans-serif',
    htmlFontSize: 16,
    fontSize: 15,
    // MUI-aligned scale: body1 16px, body2 15px for readability
    h1: {
      fontSize: '2.25rem',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.3,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.007em',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.009em',
    },
    body2: {
      fontSize: '0.9375rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.009em',
    },
    subtitle2: {
      fontSize: '0.9375rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.007em',
    },
    button: {
      fontSize: '0.9375rem',
      fontWeight: 500,
      lineHeight: 1.5,
      textTransform: 'none' as const,
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.8125rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.025em',
    },
    overline: {
      fontSize: '0.8125rem',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
