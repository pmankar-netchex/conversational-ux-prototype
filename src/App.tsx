import React from 'react';
import { ThemeProvider, CssBaseline, Box, Snackbar, Alert, useMediaQuery } from '@mui/material';
import '@fontsource/source-sans-pro/300.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/600.css';
import '@fontsource/source-sans-pro/700.css';
import theme from './theme';
import TopNav from './components/layout/TopNav';
import LeftNav from './components/layout/LeftNav';
import CenterPane from './components/layout/CenterPane';
import RightPanel from './components/layout/RightPanel';
import OverlayForm from './components/chat/OverlayForm';
import { useUiStore } from './store/uiStore';
import { useNavStore } from './store/navStore';

export default function App() {
  const { toastMessage, clearToast } = useUiStore();
  const isMobile = useMediaQuery('(max-width:768px)');
  const { leftNavOpen, setLeftNavOpen } = useNavStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* Top Nav */}
        <TopNav />

        {/* Main content area below top nav */}
        <Box sx={{ display: 'flex', flex: 1, mt: '56px', overflow: 'hidden', position: 'relative' }}>
          {/* Mobile overlay backdrop */}
          {isMobile && leftNavOpen && (
            <Box
              onClick={() => setLeftNavOpen(false)}
              sx={{
                position: 'fixed',
                top: 56,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0,0,0,0.4)',
                zIndex: 100,
              }}
            />
          )}

          {/* Left Nav */}
          {isMobile ? (
            <Box
              sx={{
                position: 'fixed',
                top: 56,
                left: 0,
                bottom: 0,
                zIndex: 101,
                transform: leftNavOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 200ms ease',
              }}
            >
              <LeftNav />
            </Box>
          ) : (
            <LeftNav />
          )}

          {/* Center Pane: overlay is rendered here so it only covers the center, not left nav */}
          <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
            <CenterPane />
            <OverlayForm />
          </Box>

          {/* Right Panel (hidden on mobile) */}
          {!isMobile && <RightPanel />}
        </Box>
      </Box>

      {/* Toast */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={3000}
        onClose={clearToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={clearToast} severity="success" sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
