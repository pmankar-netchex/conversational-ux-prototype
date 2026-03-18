import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Chip, Tooltip, Menu, MenuItem, ListItemIcon,
  ListItemText, Typography,
} from '@mui/material';
import {
  Send, AttachFile, Mic, GridView, EventAvailable, Payments,
  Schedule, PersonOutline,
} from '@mui/icons-material';

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

export default function ChatInput({ onSend, showChips = false, placeholder, disabled = false, disabledMessage }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [taskAnchor, setTaskAnchor] = useState<null | HTMLElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
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
        <Tooltip title="Coming soon">
          <IconButton size="small" sx={{ color: '#6B7280' }}>
            <Mic sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        <TextField
          fullWidth
          size="small"
          placeholder={placeholder || 'Ask me anything or pick a task...'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
          disabled={!value.trim()}
          sx={{
            color: value.trim() ? '#2563EB' : '#999',
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
