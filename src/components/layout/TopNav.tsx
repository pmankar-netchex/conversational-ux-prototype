import React, { useState, useRef } from 'react';
import {
  AppBar, Toolbar, Box, Typography, IconButton, Avatar, InputBase, Badge,
  Menu, MenuItem, Paper, ClickAwayListener, Popper, useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  HelpOutline as HelpIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavStore } from '../../store/navStore';
import { useChatStore } from '../../store/chatStore';
import { LOGO_URL } from '../../logoUrl';

const navLinks = [
  { label: 'DASHBOARD', page: 'home' },
  { label: 'MEET THE TEAM', page: 'meetTheTeam' },
  { label: 'TASKS', page: 'tasks' },
  { label: 'DOCUMENTS', page: 'documents' },
  { label: 'LEARN (NETLEARN)', page: 'learn' },
];

export default function TopNav() {
  const { activeNetchexPage, setActiveNetchexPage, setActiveChannel, leftNavOpen, toggleLeftNav } = useNavStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleNavClick = (page: string) => {
    if (page === 'home') {
      setActiveNetchexPage('home');
    } else {
      setActiveNetchexPage(page);
    }
  };

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      setActiveChannel('ask-nex');
      useChatStore.getState().setIsAskAiHome(false);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: '#1A1A2E',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: 56,
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ minHeight: '56px !important', height: 56, px: { xs: 1, sm: 2 } }}>
        {/* Mobile: hamburger menu */}
        {isMobile && (
          <IconButton size="small" onClick={toggleLeftNav} sx={{ color: 'white', mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Left: Logo + Company */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: isMobile ? 'auto' : 260 }}>
          <img
            src={LOGO_URL}
            alt="Netchex"
            style={{ height: isMobile ? 28 : 32 }}
          />
          {!isMobile && (
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 500, fontSize: '0.9375rem' }}>
              Domino's SE Louisiana LLC
            </Typography>
          )}
        </Box>

        {/* Center: Nav Links (hidden on mobile) */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 3, flex: 1, justifyContent: 'center' }}>
            {navLinks.map((link) => (
              <Typography
                key={link.page}
                variant="body2"
                onClick={() => handleNavClick(link.page)}
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  py: 0.5,
                  borderBottom: activeNetchexPage === link.page ? '2px solid white' : '2px solid transparent',
                  '&:hover': { opacity: 0.85 },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>
        )}

        {/* Spacer on mobile */}
        {isMobile && <Box sx={{ flex: 1 }} />}

        {/* Right: Search, Notifications, Help, Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
          <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
            <Box ref={searchRef} sx={{ position: 'relative' }}>
              {searchOpen ? (
                <Paper
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 1.5,
                    py: 0.25,
                    borderRadius: 2,
                    width: isMobile ? 180 : 240,
                    position: isMobile ? 'absolute' : 'relative',
                    right: isMobile ? 0 : 'auto',
                    top: isMobile ? -4 : 'auto',
                    zIndex: 10,
                  }}
                >
                  <SearchIcon sx={{ color: '#6B7280', fontSize: 18, mr: 1 }} />
                  <InputBase
                    autoFocus
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearchSubmit();
                      if (e.key === 'Escape') setSearchOpen(false);
                    }}
                    sx={{ fontSize: 14, flex: 1 }}
                  />
                </Paper>
              ) : (
                <IconButton
                  size="small"
                  onClick={() => setSearchOpen(true)}
                  sx={{ color: 'white' }}
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              )}
              {searchOpen && searchValue.trim() && (
                <Popper open anchorEl={searchRef.current} placement="bottom-end" sx={{ zIndex: 1400 }}>
                  <Paper sx={{ mt: 0.5, width: isMobile ? 180 : 240, py: 0.5 }}>
                    <MenuItem
                      onClick={handleSearchSubmit}
                      sx={{ fontSize: '0.875rem' }}
                    >
                      Ask NEX about "{searchValue}"
                    </MenuItem>
                  </Paper>
                </Popper>
              )}
            </Box>
          </ClickAwayListener>

          <IconButton size="small" sx={{ color: 'white' }}>
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 11, minWidth: 18, height: 18 } }}>
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>

          {!isMobile && (
            <IconButton size="small" sx={{ color: 'white' }}>
              <HelpIcon fontSize="small" />
            </IconButton>
          )}

          <IconButton
            size="small"
            onClick={(e) => setProfileAnchor(e.currentTarget)}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: '0.875rem',
                fontWeight: 600,
                bgcolor: '#2563EB',
              }}
            >
              MR
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            PaperProps={{ sx: { mt: 1, minWidth: 160 } }}
          >
            <MenuItem sx={{ fontSize: '0.9375rem' }}>View Profile</MenuItem>
            <MenuItem sx={{ fontSize: '0.9375rem' }}>Settings</MenuItem>
            <MenuItem sx={{ fontSize: '0.9375rem' }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
