import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Tooltip } from '@mui/material';
import { ChatBubbleOutline, AddReactionOutlined, AutoAwesome } from '@mui/icons-material';
import type { Message } from '../../data/messages';
import { LOGO_URL } from '../../logoUrl';
import RichCard from './RichCard';

interface MessageBubbleProps {
  message: Message;
  isAskAi?: boolean;
  onQuickReply?: (reply: string) => void;
  onShiftPickup?: (shift: any) => void;
  onAskNex?: () => void;
  onAskNexWithMessage?: (content: string) => void;
  onNavigate?: (page: string) => void;
}

export default function MessageBubble({ message, isAskAi = false, onQuickReply, onShiftPickup, onAskNex, onAskNexWithMessage, onNavigate }: MessageBubbleProps) {
  const [hovered, setHovered] = useState(false);
  const isUser = message.senderId === 'user';
  const isBot = message.isBot;

  // Ask AI channel: user messages right-aligned, bot messages left-aligned
  if (isAskAi) {
    if (isUser) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, px: 2 }}>
          <Box sx={{ maxWidth: '70%' }}>
            <Box
              sx={{
                bgcolor: '#2563EB',
                color: 'white',
                px: 2,
                py: 1.25,
                borderRadius: '16px 16px 4px 16px',
              }}
            >
              <Typography variant="body1" sx={{ fontSize: 14, lineHeight: 1.5 }}>
                {message.content}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#999', mt: 0.25, display: 'block', textAlign: 'right' }}>
              {new Date(message.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </Typography>
          </Box>
        </Box>
      );
    }

    // Bot message
    return (
      <Box sx={{ display: 'flex', gap: 1, mb: 2, px: 2 }}>
        <Avatar
          src={LOGO_URL}
          sx={{ width: 36, height: 36, mt: 0.5 }}
        />
        <Box sx={{ maxWidth: '70%' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, fontSize: 13, mb: 0.25 }}>
            NEX
          </Typography>
          <Box
            sx={{
              bgcolor: '#F3F4F6',
              color: '#333',
              px: 2,
              py: 1.25,
              borderRadius: '4px 16px 16px 16px',
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}
            >
              {message.content}
            </Typography>
            {message.richContent && (
              <RichCard
                richContent={message.richContent}
                onQuickReply={onQuickReply}
                onShiftPickup={onShiftPickup}
                onAskNex={onAskNex}
                onNavigate={onNavigate}
              />
            )}
          </Box>
          <Typography variant="caption" sx={{ color: '#999', mt: 0.25, display: 'block' }}>
            {new Date(message.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Regular channel: Bot/AI messages shown as "only visible to you"
  if (isBot) {
    return (
      <Box
        sx={{
          mx: 2,
          mb: 1.5,
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
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, fontSize: 12, mb: 0.25 }}>
                NEX
              </Typography>
              <Typography variant="caption" sx={{ color: '#999' }}>
                {new Date(message.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontSize: 13, mt: 0.25 }}>
              {message.content}
            </Typography>
            {message.richContent && (
              <RichCard
                richContent={message.richContent}
                onQuickReply={onQuickReply}
                onShiftPickup={onShiftPickup}
                onAskNex={onAskNex}
                onNavigate={onNavigate}
              />
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  // Regular channel messages (Slack-style)
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: 'flex',
        gap: 1.5,
        mb: 1.5,
        px: 2,
        py: 0.5,
        position: 'relative',
        '&:hover': { bgcolor: '#F9FAFB' },
      }}
    >
      {/* Hover action toolbar */}
      {hovered && (
        <Box
          sx={{
            position: 'absolute',
            top: -14,
            right: 16,
            display: 'flex',
            bgcolor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: 1.5,
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            overflow: 'hidden',
          }}
        >
          <Tooltip title="Reply in thread" placement="top">
            <IconButton
              size="small"
              sx={{
                borderRadius: 0,
                px: 1,
                py: 0.5,
                color: '#6B7280',
                '&:hover': { bgcolor: '#F3F4F6', color: '#333' },
              }}
            >
              <ChatBubbleOutline sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="React" placement="top">
            <IconButton
              size="small"
              sx={{
                borderRadius: 0,
                px: 1,
                py: 0.5,
                color: '#6B7280',
                '&:hover': { bgcolor: '#F3F4F6', color: '#333' },
              }}
            >
              <AddReactionOutlined sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ask NEX" placement="top">
            <IconButton
              size="small"
              onClick={() => onAskNexWithMessage?.(message.content)}
              sx={{
                borderRadius: 0,
                px: 1,
                py: 0.5,
                color: '#6B7280',
                '&:hover': { bgcolor: '#EFF6FF', color: '#2563EB' },
              }}
            >
              <AutoAwesome sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <Avatar
        sx={{
          width: 36,
          height: 36,
          fontSize: 13,
          fontWeight: 600,
          bgcolor: isUser ? '#2563EB' : '#6B7280',
          mt: 0.25,
        }}
      >
        {message.senderInitials}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 14 }}>
            {message.senderName}
          </Typography>
          {message.senderRole && (
            <Typography
              variant="caption"
              sx={{
                bgcolor: '#F3F4F6',
                px: 0.75,
                py: 0.15,
                borderRadius: 0.5,
                fontSize: 10,
                color: '#757575',
                fontWeight: 500,
              }}
            >
              {message.senderRole}
            </Typography>
          )}
          <Typography variant="caption" sx={{ color: '#999' }}>
            {new Date(message.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontSize: 14, lineHeight: 1.5, mt: 0.25 }}>
          {message.content}
        </Typography>
        {message.richContent && (
          <RichCard
            richContent={message.richContent}
            onQuickReply={onQuickReply}
            onShiftPickup={onShiftPickup}
            onAskNex={onAskNex}
            onNavigate={onNavigate}
          />
        )}
      </Box>
    </Box>
  );
}
