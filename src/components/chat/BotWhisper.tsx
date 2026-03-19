import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { useChatStore } from '../../store/chatStore';
import { LOGO_URL } from '../../logoUrl';

interface BotWhisperProps {
  message: string;
  onAccept: () => void;
  onDismiss: () => void;
}

export default function BotWhisper({ message, onAccept, onDismiss }: BotWhisperProps) {
  return (
    <Box
      sx={{
        mx: 2,
        mb: 2,
        p: 1.5,
        bgcolor: '#FFFBEB',
        border: '1px dashed #E5E7EB',
        borderRadius: 2,
      }}
    >
      <Typography variant="caption" sx={{ color: '#999', fontStyle: 'italic', display: 'block', mb: 0.75 }}>
        Only visible to you
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        <Avatar
          src={LOGO_URL}
          sx={{ width: 28, height: 28 }}
        />
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, fontSize: 12, mb: 0.25 }}>
            NEX
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 13, mb: 1 }}
            dangerouslySetInnerHTML={{ __html: message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              onClick={onAccept}
              sx={{
                borderRadius: 16,
                textTransform: 'none',
                fontSize: 12,
                py: 0.25,
                bgcolor: '#2563EB',
                '&:hover': { bgcolor: '#1D4ED8' },
              }}
            >
              Yes, let's do it
            </Button>
            <Button
              size="small"
              onClick={onDismiss}
              sx={{ borderRadius: 16, textTransform: 'none', fontSize: 12, color: '#757575' }}
            >
              Dismiss
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
