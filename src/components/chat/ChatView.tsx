import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import BotWhisper from './BotWhisper';
import { useChatStore } from '../../store/chatStore';
import { useNavStore } from '../../store/navStore';
import { channelMessages } from '../../data/messages';
import type { Message } from '../../data/messages';
import { handleUserMessage, detectWhisperIntent } from '../../flows/flowEngine';
import { channels } from '../../data/channels';
import { LOGO_URL } from '../../logoUrl';

interface ChatViewProps {
  channelId: string;
  isAskAi?: boolean;
}

export default function ChatView({ channelId, isAskAi = false }: ChatViewProps) {
  const {
    messagesByChannel, addMessage, isTyping, setIsTyping,
    activeFlow, setActiveFlow, clearActiveFlow,
    openOverlay, whisper, setWhisper, clearWhisper,
  } = useChatStore();
  const { setLeftNavOpen, setActiveNetchexPage } = useNavStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Merge static + dynamic messages
  const staticMsgs = channelMessages[channelId] || [];
  const dynamicMsgs = messagesByChannel[channelId] || [];
  const allMessages = [...staticMsgs, ...dynamicMsgs];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allMessages.length, isTyping]);

  const handleSend = (text: string) => {
    // Auto-collapse left nav on first message in ask-nex
    if (isAskAi) {
      setLeftNavOpen(false);
    }

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      channelId,
      senderId: 'user',
      senderName: 'Maria Rodriguez',
      senderInitials: 'MR',
      timestamp: new Date().toISOString(),
      content: text,
    };
    addMessage(channelId, userMsg);

    if (isAskAi) {
      // Process through flow engine
      setIsTyping(true);
      setTimeout(() => {
        const result = handleUserMessage(channelId, text, activeFlow);
        setIsTyping(false);

        // Add bot messages with staggered delays
        result.messages.forEach((msg, i) => {
          setTimeout(() => {
            addMessage(channelId, msg);
          }, i * 400);
        });

        if (result.openOverlay) {
          setTimeout(() => {
            openOverlay(result.openOverlay!.type, result.openOverlay!.data);
          }, result.messages.length * 400 + 200);
        }

        if (result.navigateTo) {
          setTimeout(() => {
            setActiveNetchexPage(result.navigateTo!);
          }, result.messages.length * 400 + 600);
        }

        if (result.setFlow) {
          setActiveFlow(result.setFlow as any);
        }
        if (result.clearFlow) {
          clearActiveFlow();
        }
      }, 700 + Math.random() * 500);
    } else {
      // Regular channel: check for whisper intent
      const whisperResult = detectWhisperIntent(text);
      if (whisperResult) {
        setTimeout(() => {
          setWhisper({
            channelId,
            flowId: whisperResult.flowId,
            message: whisperResult.message,
          });
        }, 500);
      }
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const handleShiftPickup = (shift: any) => {
    openOverlay('shiftPickup', { shift });
  };

  const handleNavigate = (page: string) => {
    setActiveNetchexPage(page);
  };

  const handleAskNex = () => {
    const { setActiveChannel } = useNavStore.getState();
    setActiveChannel('ask-nex');
    useChatStore.getState().setIsAskAiHome(false);
    setTimeout(() => {
      const store = useChatStore.getState();
      const msg = {
        id: `user-${Date.now()}`,
        channelId: 'ask-nex',
        senderId: 'user',
        senderName: 'Maria Rodriguez',
        senderInitials: 'MR',
        timestamp: new Date().toISOString(),
        content: 'I have a question about my last paycheck',
      };
      store.addMessage('ask-nex', msg);
      store.setIsTyping(true);
      setTimeout(() => {
        const result = handleUserMessage('ask-nex', 'Show me my last paycheck', { flowId: null, step: 0, data: {} });
        store.setIsTyping(false);
        result.messages.forEach((m, i) => {
          setTimeout(() => store.addMessage('ask-nex', m), i * 400);
        });
        if (result.setFlow) {
          store.setActiveFlow(result.setFlow as any);
        }
      }, 700 + Math.random() * 500);
    }, 300);
  };

  const handleAskNexWithMessage = (content: string) => {
    const { setActiveChannel } = useNavStore.getState();
    setActiveChannel('ask-nex');
    useChatStore.getState().setIsAskAiHome(false);
    setTimeout(() => {
      const store = useChatStore.getState();
      const msg = {
        id: `user-${Date.now()}`,
        channelId: 'ask-nex',
        senderId: 'user',
        senderName: 'Maria Rodriguez',
        senderInitials: 'MR',
        timestamp: new Date().toISOString(),
        content,
      };
      store.addMessage('ask-nex', msg);
      store.setIsTyping(true);
      setTimeout(() => {
        const result = handleUserMessage('ask-nex', content, { flowId: null, step: 0, data: {} });
        store.setIsTyping(false);
        result.messages.forEach((m, i) => {
          setTimeout(() => store.addMessage('ask-nex', m), i * 400);
        });
        if (result.openOverlay) {
          setTimeout(() => {
            store.openOverlay(result.openOverlay!.type, result.openOverlay!.data);
          }, result.messages.length * 400 + 200);
        }
        if (result.setFlow) {
          store.setActiveFlow(result.setFlow as any);
        }
      }, 700 + Math.random() * 500);
    }, 300);
  };

  const handleWhisperAccept = () => {
    if (whisper) {
      clearWhisper();
      // Check if this is a DM channel — redirect to ask-nex
      const channel = channels.find((c) => c.id === whisper.channelId);
      if (channel?.type === 'dm') {
        const { setActiveChannel } = useNavStore.getState();
        setActiveChannel('ask-nex');
        useChatStore.getState().setIsAskAiHome(false);
        const flowPrompts: Record<string, string> = {
          leave: 'I want to request time off',
          shifts: 'Show me available shifts to pick up',
          personalInfo: 'I need to update my direct deposit',
          payStub: 'Show me my last paycheck',
          benefits: 'Show me my benefits',
          runPayroll: 'Run payroll preview',
        };
        const prompt = flowPrompts[whisper.flowId] || whisper.message;
        setTimeout(() => {
          const askAiView = useChatStore.getState();
          const msg = {
            id: `user-${Date.now()}`,
            channelId: 'ask-nex',
            senderId: 'user',
            senderName: 'Maria Rodriguez',
            senderInitials: 'MR',
            timestamp: new Date().toISOString(),
            content: prompt,
          };
          askAiView.addMessage('ask-nex', msg);
          askAiView.setIsTyping(true);
          setTimeout(() => {
            const result = handleUserMessage('ask-nex', prompt, { flowId: null, step: 0, data: {} });
            askAiView.setIsTyping(false);
            result.messages.forEach((m, i) => {
              setTimeout(() => askAiView.addMessage('ask-nex', m), i * 400);
            });
            if (result.openOverlay) {
              setTimeout(() => {
                askAiView.openOverlay(result.openOverlay!.type, result.openOverlay!.data);
              }, result.messages.length * 400 + 200);
            }
            if (result.setFlow) {
              askAiView.setActiveFlow(result.setFlow as any);
            }
          }, 700 + Math.random() * 500);
        }, 300);
        return;
      }

      // Group channel: open overlay based on flow (existing behavior)
      if (whisper.flowId === 'leave') {
        openOverlay('leaveRequest');
        setActiveFlow({ flowId: 'leave', step: 2, data: {} });
      } else if (whisper.flowId === 'shifts') {
        openOverlay('shiftPickup', { shift: { title: 'Fri, Mar 20 | 11:00 AM – 7:00 PM', subtitle: 'Store #142, Metairie — Shift Lead', detail: 'Posted by: David Kim (swap)' } });
        setActiveFlow({ flowId: 'shifts', step: 2, data: {} });
      } else if (whisper.flowId === 'personalInfo') {
        openOverlay('directDeposit');
        setActiveFlow({ flowId: 'personalInfo', step: 2, subType: 'directDeposit', data: {} });
      } else if (whisper.flowId === 'payStub') {
        const { setActiveChannel } = useNavStore.getState();
        setActiveChannel('ask-nex');
        useChatStore.getState().setIsAskAiHome(false);
        setTimeout(() => handleSend('Show me my last paycheck'), 100);
      } else if (whisper.flowId === 'benefits') {
        setActiveNetchexPage('benefits');
      } else if (whisper.flowId === 'runPayroll') {
        setActiveNetchexPage('runPayroll');
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Messages area */}
      <Box ref={scrollRef} sx={{ flex: 1, overflow: 'auto', py: 2 }}>
        {allMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isAskAi={isAskAi}
            onQuickReply={handleQuickReply}
            onShiftPickup={handleShiftPickup}
            onAskNex={!isAskAi ? handleAskNex : undefined}
            onAskNexWithMessage={!isAskAi ? handleAskNexWithMessage : undefined}
            onNavigate={handleNavigate}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && isAskAi && (
          <Box sx={{ display: 'flex', gap: 1, px: 2, mb: 2, alignItems: 'center' }}>
            <Box
              component="img"
              src={LOGO_URL}
              sx={{ width: 36, height: 36, borderRadius: '50%' }}
            />
            <Box sx={{ display: 'flex', gap: 0.5, bgcolor: '#F3F4F6', px: 2, py: 1, borderRadius: '4px 16px 16px 16px' }}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#999',
                    animation: 'pulse 1.4s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                    '@keyframes pulse': {
                      '0%, 80%, 100%': { opacity: 0.3 },
                      '40%': { opacity: 1 },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Bot whisper */}
        {whisper && whisper.channelId === channelId && (
          <BotWhisper
            message={whisper.message}
            onAccept={handleWhisperAccept}
            onDismiss={clearWhisper}
          />
        )}
      </Box>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        placeholder={isAskAi ? 'Ask me anything or pick a task...' : `Message ${channelId === 'ask-nex' ? '#ask-nex' : '#' + channelId}`}
      />
    </Box>
  );
}
