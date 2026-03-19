import React from 'react';
import { Box, Typography, Avatar, Fade, useMediaQuery, Chip } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import ChatInput from '../chat/ChatInput';
import { employee } from '../../data/employee';
import { getGreeting } from '../../utils/timeUtils';
import { useChatStore } from '../../store/chatStore';
import { useNavStore } from '../../store/navStore';
import { handleUserMessage } from '../../flows/flowEngine';
import { LOGO_URL } from '../../logoUrl';

const exampleQueries = [
  'NEX, show me my last paycheck.',
  'NEX, request time off for next Friday.',
  'NEX, what shifts are available this week?',
  'NEX, update my direct deposit.',
  'NEX, run payroll preview.',
  'NEX, show me my benefits.',
];

export default function AskAIHome() {
  const { setIsAskAiHome, addMessage, setIsTyping, setActiveFlow, openOverlay } = useChatStore();
  const { setLeftNavOpen, setActiveNetchexPage } = useNavStore();
  const greeting = getGreeting();
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleSend = (text: string) => {
    setIsAskAiHome(false);
    setLeftNavOpen(false);

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      channelId: 'ask-nex',
      senderId: 'user',
      senderName: 'Maria Rodriguez',
      senderInitials: 'MR',
      timestamp: new Date().toISOString(),
      content: text,
    };
    addMessage('ask-nex', userMsg);

    // Process
    setIsTyping(true);
    setTimeout(() => {
      const result = handleUserMessage('ask-nex', text, { flowId: null, step: 0, data: {} });
      setIsTyping(false);

      result.messages.forEach((msg: any, i: number) => {
        setTimeout(() => addMessage('ask-nex', msg), i * 400);
      });

      if (result.openOverlay) {
        setTimeout(() => openOverlay(result.openOverlay!.type, result.openOverlay!.data), result.messages.length * 400 + 200);
      }
      if (result.setFlow) {
        setActiveFlow(result.setFlow as any);
      }
    }, 700 + Math.random() * 500);
  };

  return (
    <Fade in timeout={300}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: isMobile ? 2 : 3 }}>
          {/* NEX Bot Avatar */}
          <Avatar
            src={LOGO_URL}
            sx={{
              width: 64,
              height: 64,
              mb: 1.5,
              boxShadow: '0 2px 12px rgba(37,99,235,0.15)',
            }}
          />

          {/* Greeting */}
          <Typography variant="h3" sx={{ fontSize: 24, fontWeight: 600, mb: 0.5, textAlign: 'center' }}>
            {greeting}, {employee.firstName}!
          </Typography>

          {/* Tagline */}
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              mb: 1,
              textAlign: 'center',
              maxWidth: 480,
              fontSize: 15,
              lineHeight: 1.5,
            }}
          >
            Today HR software forces you to navigate menus.{' '}
            <Box component="span" sx={{ fontWeight: 600, color: '#2563EB' }}>
              With Netchex NEX, you simply ask for outcomes.
            </Box>
          </Typography>

          <Typography variant="body2" sx={{ color: '#757575', mb: 2, textAlign: 'center', fontSize: 14 }}>
            Just type what you need — pay, time off, shifts, benefits, or personal info — and NEX will handle it.
          </Typography>

          {/* Let's ask NEX header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <AutoAwesome sx={{ fontSize: 18, color: '#2563EB' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#2563EB', fontSize: 13, letterSpacing: '0.5px' }}>
              LET'S ASK NEX
            </Typography>
          </Box>

          {/* Example queries */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              maxWidth: 440,
              width: '100%',
              px: isMobile ? 2 : 0,
              mb: 2,
            }}
          >
            {exampleQueries.map((query) => (
              <Chip
                key={query}
                label={query}
                variant="outlined"
                onClick={() => handleSend(query)}
                sx={{
                  justifyContent: 'flex-start',
                  height: 'auto',
                  py: 1,
                  px: 0.5,
                  fontSize: 13,
                  borderColor: '#E5E7EB',
                  color: '#333',
                  borderRadius: 2,
                  cursor: 'pointer',
                  '& .MuiChip-label': { whiteSpace: 'normal' },
                  '&:hover': { bgcolor: '#EFF6FF', borderColor: '#2563EB', color: '#2563EB' },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Chat input with chips */}
        <ChatInput onSend={handleSend} showChips />
      </Box>
    </Fade>
  );
}
