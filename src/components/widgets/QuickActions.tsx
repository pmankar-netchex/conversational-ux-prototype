import React from 'react';
import { Card, CardContent, Typography, Box, Link } from '@mui/material';
import { useUiStore } from '../../store/uiStore';

interface QuickActionsProps {
  onUpdateDeposit?: () => void;
  onViewBenefits?: () => void;
}

export default function QuickActions({ onUpdateDeposit, onViewBenefits }: QuickActionsProps) {
  const { showToast } = useUiStore();

  return (
    <Card sx={{ minWidth: 200, flex: 1 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600, mb: 1.5 }}>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Link
            component="button"
            underline="hover"
            onClick={onUpdateDeposit}
            sx={{ fontSize: 14, color: '#2563EB', textAlign: 'left' }}
          >
            Update Direct Deposit
          </Link>
          <Link
            component="button"
            underline="hover"
            onClick={onViewBenefits}
            sx={{ fontSize: 14, color: '#2563EB', textAlign: 'left' }}
          >
            View Benefits
          </Link>
          <Link
            component="button"
            underline="hover"
            onClick={() => showToast('W-2 downloaded')}
            sx={{ fontSize: 14, color: '#2563EB', textAlign: 'left' }}
          >
            Download W-2
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
