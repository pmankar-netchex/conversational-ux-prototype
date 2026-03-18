import React from 'react';
import { Box, Typography, Avatar, AvatarGroup, IconButton, Button } from '@mui/material';
import { History, AddComment } from '@mui/icons-material';
import { channels } from '../../data/channels';
import { useUiStore } from '../../store/uiStore';
import { useChatStore } from '../../store/chatStore';

interface ChannelHeaderProps {
  channelId: string;
}

export default function ChannelHeader({ channelId }: ChannelHeaderProps) {
  const channel = channels.find((c) => c.id === channelId);
  const { toggleRightPanel } = useUiStore();
  const { startNewChat } = useChatStore();

  if (!channel) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        borderBottom: '1px solid #E5E7EB',
        minHeight: 48,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {channel.type === 'dm' && channel.members?.[0] && (
          <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: '#6B7280' }}>
            {channel.members[0].initials}
          </Avatar>
        )}
        <Box>
          <Typography variant="h4" sx={{ fontSize: 15, fontWeight: 600 }}>
            {channel.name}
          </Typography>
          {channel.memberCount && (
            <Typography variant="caption" sx={{ color: '#757575' }}>
              {channel.memberCount} members
              {channel.description && ` \u00B7 ${channel.description}`}
            </Typography>
          )}
          {channel.type === 'dm' && channel.members?.[0] && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: channel.members[0].isOnline ? '#16A34A' : '#999',
                }}
              />
              <Typography variant="caption" sx={{ color: '#757575' }}>
                {channel.members[0].isOnline ? 'Online' : 'Offline'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {channel.members && channel.members.length > 1 && (
          <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 11 } }}>
            {channel.members.map((m) => (
              <Avatar key={m.name} sx={{ bgcolor: '#6B7280' }}>{m.initials}</Avatar>
            ))}
          </AvatarGroup>
        )}
        {channelId === 'ask-nex' && (
          <>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddComment sx={{ fontSize: 16 }} />}
              onClick={startNewChat}
              sx={{
                borderRadius: 20,
                textTransform: 'none',
                fontSize: 12,
                borderColor: '#E5E7EB',
                color: '#333',
                px: 1.5,
                '&:hover': { bgcolor: '#F3F4F6', borderColor: '#2563EB', color: '#2563EB' },
              }}
            >
              New Chat
            </Button>
            <IconButton size="small" onClick={toggleRightPanel} sx={{ color: '#6B7280' }}>
              <History sx={{ fontSize: 20 }} />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
}
