import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Chip, Tooltip, Menu, MenuItem, ListItemIcon,
  ListItemText, Typography, keyframes,
} from '@mui/material';
import {
  Send, AttachFile, Mic, GridView, EventAvailable, Payments,
  Schedule, PersonOutline,
} from '@mui/icons-material';
import { useVoiceInput } from '../../hooks/useVoiceInput';

interface ChatInputProps {
  onSend: (message: string) => void;
  showChips?: boolean;
  placeholder?: string;
  disabled?: boolean;
  disabledMessage?: string;
}

const quickChips = [
  { label: 'Request Time Off', icon: <EventAvailable sx={{ fontSize: 16 }} /> },
  { label: 'Check My Pay', icon: <Payments sx={{ fontSize: 16 }} /> },
  { label: 'View Shifts', icon: <Schedule sx={{ fontSize: 16 }} /> },
  { label: 'Update My Info', icon: <PersonOutline sx={{ fontSize: 16 }} /> },
];

const taskMenuItems = [
  { label: 'Request Time Off', icon: <EventAvailable />, desc: 'Submit a PTO or leave request' },
  { label: 'View Pay Stubs', icon: <Payments />, desc: 'Check your recent earnings and deductions' },
  { label: 'Browse Open Shifts', icon: <Schedule />, desc: 'See and pick up available shifts' },
  { label: 'Update Personal Info', icon: <PersonOutline />, desc: 'Change address, bank details, or contact info' },
];

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

export default function ChatInput({ onSend, showChips = false, placeholder, disabled = false, disabledMessage }: ChatInputProps) {
  const [typedText, setTypedText] = useState('');
  const [taskAnchor, setTaskAnchor] = useState<null | HTMLElement>(null);
  const {
    isListening, transcript, isSupported, error,
    startListening, stopListening, resetTranscript,
  } = useVoiceInput();

  // Compute display value: typed text + live voice transcript
  const displayValue = typedText + transcript;

  const handleSend = () => {
    // If recording, stop and merge first
    if (isListening) {
      stopListening();
    }
    const fullText = (typedText + transcript).trim();
    if (!fullText) return;
    onSend(fullText);
    setTypedText('');
    resetTranscript();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      // Merge transcript into typedText before stopping
      if (transcript) {
        setTypedText((prev) => prev + transcript);
        resetTranscript();
      }
      stopListening();
    } else {
      startListening();
    }
  };

  if (disabled) {
    return (
      <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid #E5E7EB', bgcolor: '#F9FAFB' }}>
        <Box
          sx={{
            bgcolor: '#F3F4F6',
            borderRadius: 2,
            px: 2,
            py: 1.25,
            color: '#999',
            fontSize: 14,
          }}
        >
          {disabledMessage || 'This channel is read-only.'}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ borderTop: '1px solid #E5E7EB', bgcolor: 'white' }}>
      {/* Quick action chips */}
      {showChips && (
        <Box sx={{ px: 2, pt: 1.5, pb: 0.5, display: 'flex', gap: 1, overflowX: 'auto' }}>
          {quickChips.map((chip) => (
            <Chip
              key={chip.label}
              label={chip.label}
              icon={chip.icon}
              variant="outlined"
              size="small"
              onClick={() => onSend(chip.label)}
              sx={{
                borderColor: '#E5E7EB',
                fontSize: 12,
                '&:hover': { bgcolor: '#EFF6FF', borderColor: '#2563EB' },
                '& .MuiChip-icon': { fontSize: 16 },
              }}
            />
          ))}
        </Box>
      )}

      {/* Input row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1.5, py: 1 }}>
        <Tooltip title="Coming soon">
          <IconButton size="small" sx={{ color: '#6B7280' }}>
            <AttachFile sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={
            !isSupported
              ? 'Voice input is not supported in this browser'
              : error
                ? error
                : isListening
                  ? 'Stop voice input'
                  : 'Start voice input'
          }
        >
          <span>
            <IconButton
              size="small"
              onClick={handleMicClick}
              disabled={!isSupported || disabled}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
              sx={{
                color: isListening ? '#EF4444' : '#6B7280',
                animation: isListening ? `${pulseAnimation} 1.5s infinite` : 'none',
                borderRadius: '50%',
                '&:hover': {
                  bgcolor: isListening ? '#FEE2E2' : undefined,
                },
              }}
            >
              <Mic sx={{ fontSize: 20 }} />
            </IconButton>
          </span>
        </Tooltip>
        {isListening && (
          <Typography
            variant="caption"
            aria-live="polite"
            sx={{
              color: '#EF4444',
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              animation: 'fadeIn 0.3s ease-in',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            Listening...
          </Typography>
        )}

        <TextField
          fullWidth
          size="small"
          placeholder={placeholder || 'Ask me anything or pick a task...'}
          value={displayValue}
          onChange={(e) => {
            if (!isListening) {
              setTypedText(e.target.value);
            } else {
              // While listening, allow typing by stripping the voice portion
              const newVal = e.target.value;
              const voiceSuffix = transcript;
              if (newVal.endsWith(voiceSuffix)) {
                setTypedText(newVal.slice(0, newVal.length - voiceSuffix.length));
              } else {
                // User edited within the voice portion — accept the full edit
                setTypedText(newVal);
              }
            }
          }}
          onKeyDown={handleKeyDown}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 20,
              fontSize: 14,
              bgcolor: '#F9FAFB',
              '& fieldset': { borderColor: '#E5E7EB' },
            },
          }}
        />

        <Tooltip title="Netchex Tasks">
          <IconButton
            size="small"
            onClick={(e) => setTaskAnchor(e.currentTarget)}
            sx={{ color: '#6B7280' }}
          >
            <GridView sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        <IconButton
          size="small"
          onClick={handleSend}
          disabled={!displayValue.trim()}
          sx={{
            color: displayValue.trim() ? '#2563EB' : '#999',
            '&:hover': { bgcolor: '#EFF6FF' },
          }}
        >
          <Send sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Task menu */}
      <Menu
        anchorEl={taskAnchor}
        open={Boolean(taskAnchor)}
        onClose={() => setTaskAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{ sx: { width: 300, mb: 1 } }}
      >
        {taskMenuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              setTaskAnchor(null);
              onSend(item.label);
            }}
            sx={{ py: 1 }}
          >
            <ListItemIcon sx={{ color: '#2563EB' }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              secondary={item.desc}
              primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
              secondaryTypographyProps={{ fontSize: 12 }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
