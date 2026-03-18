import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface ShiftCardProps {
  onAction?: () => void;
}

export default function ShiftCard({ onAction }: ShiftCardProps) {
  return (
    <Card sx={{ minWidth: 200, flex: 1 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600, mb: 1.5 }}>
          Next Shift
        </Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#333', mb: 0.25 }}>
          Tomorrow, 11:00 AM – 7:00 PM
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575', fontSize: 13 }}>
          Store #142 — Shift Lead
        </Typography>
        <Box sx={{ mt: 1.5 }}>
          <Button
            size="small"
            onClick={onAction}
            sx={{ color: '#2563EB', textTransform: 'none', fontSize: 13, p: 0, minWidth: 0 }}
          >
            View Schedule
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
