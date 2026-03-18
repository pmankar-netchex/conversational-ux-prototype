import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { ptoBalance } from '../../data/ptoBalances';

interface PTOCardProps {
  onAction?: () => void;
}

export default function PTOCard({ onAction }: PTOCardProps) {
  return (
    <Card sx={{ minWidth: 200, flex: 1 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600, mb: 1.5 }}>
          Time Off
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575', fontSize: 12, mb: 0.25 }}>
          {ptoBalance.planName}
        </Typography>
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#2563EB', lineHeight: 1.2 }}>
          {ptoBalance.availableHours} hours
        </Typography>
        <Typography variant="caption" sx={{ color: '#757575' }}>
          available
        </Typography>
        <Box sx={{ mt: 1.5 }}>
          <Button
            size="small"
            onClick={onAction}
            sx={{ color: '#2563EB', textTransform: 'none', fontSize: 13, p: 0, minWidth: 0 }}
          >
            Request Time Off
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
