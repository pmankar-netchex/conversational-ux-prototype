import React, { useState } from 'react';
import { Box, Typography, Avatar, Chip, Divider } from '@mui/material';
import ChatInput from '../chat/ChatInput';
import { announcements } from '../../data/announcements';

export default function AnnouncementFeed() {
  const [reactions, setReactions] = useState(
    announcements.map((a) => a.reactions?.map((r) => ({ ...r })) || [])
  );

  const toggleReaction = (msgIdx: number, reactionIdx: number) => {
    setReactions((prev) => {
      const updated = prev.map((r) => r.map((rr) => ({ ...rr })));
      const reaction = updated[msgIdx][reactionIdx];
      if (reaction.includesUser) {
        reaction.count -= 1;
        reaction.includesUser = false;
      } else {
        reaction.count += 1;
        reaction.includesUser = true;
      }
      return updated;
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #E5E7EB' }}>
        <Typography variant="h4" sx={{ fontSize: 16, fontWeight: 600 }}>
          #announcements
        </Typography>
        <Typography variant="caption" sx={{ color: '#757575' }}>
          124 members &middot; Company-wide announcements and updates.
        </Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
        {announcements.map((msg, msgIdx) => (
          <React.Fragment key={msg.id}>
            <Box sx={{ px: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    fontSize: 13,
                    fontWeight: 600,
                    bgcolor: msg.senderRole === 'System' ? '#6B7280' : '#2563EB',
                  }}
                >
                  {msg.senderInitials}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 14 }}>
                      {msg.senderName}
                    </Typography>
                    {msg.senderRole && (
                      <Chip
                        label={msg.senderRole}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: 10,
                          bgcolor: msg.senderRole === 'Admin' ? '#EFF6FF' : msg.senderRole === 'Manager' ? '#F0FDF4' : '#F3F4F6',
                          color: msg.senderRole === 'Admin' ? '#2563EB' : msg.senderRole === 'Manager' ? '#16A34A' : '#6B7280',
                        }}
                      />
                    )}
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      {new Date(msg.timestamp).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: 14, lineHeight: 1.6, mt: 0.5 }}>
                    {msg.content}
                  </Typography>

                  {/* Reactions */}
                  {reactions[msgIdx] && reactions[msgIdx].length > 0 && (
                    <Box sx={{ display: 'flex', gap: 0.75, mt: 1 }}>
                      {reactions[msgIdx].map((reaction, rIdx) => (
                        <Chip
                          key={rIdx}
                          label={`${reaction.emoji} ${reaction.count}`}
                          size="small"
                          onClick={() => toggleReaction(msgIdx, rIdx)}
                          sx={{
                            height: 26,
                            fontSize: 12,
                            bgcolor: reaction.includesUser ? '#EFF6FF' : '#F3F4F6',
                            border: reaction.includesUser ? '1px solid #2563EB' : '1px solid transparent',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#EFF6FF' },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            {msgIdx < announcements.length - 1 && <Divider sx={{ mx: 2, my: 1 }} />}
          </React.Fragment>
        ))}
      </Box>

      {/* Disabled input */}
      <ChatInput onSend={() => {}} disabled disabledMessage="This channel is read-only." />
    </Box>
  );
}
