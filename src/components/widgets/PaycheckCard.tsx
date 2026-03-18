import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { employee } from '../../data/employee';
import { formatCurrency } from '../../utils/formatters';

interface PaycheckCardProps {
  onAction?: () => void;
}

export default function PaycheckCard({ onAction }: PaycheckCardProps) {
  return (
    <Card sx={{ minWidth: 200, flex: 1 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600, mb: 1.5 }}>
          Next Paycheck
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575', fontSize: 12, mb: 0.25 }}>
          Mar 28, 2026
        </Typography>
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#333', lineHeight: 1.2 }}>
          $1,247.50
        </Typography>
        <Typography variant="caption" sx={{ color: '#757575' }}>
          {employee.payFrequency} | Direct Deposit
        </Typography>
        <Box sx={{ mt: 1.5 }}>
          <Button
            size="small"
            onClick={onAction}
            sx={{ color: '#2563EB', textTransform: 'none', fontSize: 13, p: 0, minWidth: 0 }}
          >
            View Pay History
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
