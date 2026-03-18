import React from 'react';
import { Box, Typography, IconButton, List, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useUiStore } from '../../store/uiStore';
import { chatSessions } from '../../data/chatSessions';

export default function RightPanel() {
  const { rightPanelOpen, setRightPanelOpen } = useUiStore();

  if (!rightPanelOpen) return null;

  return (
    <Box
      sx={{
        width: 360,
        borderLeft: '1px solid #E5E7EB',
        bgcolor: 'white',
        height: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 200ms ease',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: '1px solid #E5E7EB' }}>
        <Typography variant="h4" sx={{ fontSize: 16, fontWeight: 600 }}>
          Chat History
        </Typography>
        <IconButton size="small" onClick={() => setRightPanelOpen(false)}>
          <Close sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Sessions List */}
      <Box sx={{ overflow: 'auto', flex: 1 }}>
        <List disablePadding>
          {chatSessions.map((session, idx) => (
            <React.Fragment key={session.id}>
              <ListItemButton sx={{ px: 2, py: 1.5 }}>
                <ListItemText
                  primary={session.title}
                  secondary={
                    <>
                      <Typography component="span" variant="caption" sx={{ color: '#757575', display: 'block' }}>
                        {new Date(session.timestamp).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
                        {' \u00B7 '}
                        {session.messageCount} messages
                      </Typography>
                      <Typography component="span" variant="caption" sx={{ color: '#999', display: 'block', mt: 0.25 }} noWrap>
                        {session.lastMessagePreview}
                      </Typography>
                    </>
                  }
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                />
              </ListItemButton>
              {idx < chatSessions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}
