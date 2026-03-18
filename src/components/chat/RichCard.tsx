import React from 'react';
import { Box, Card, CardContent, Typography, Button, Divider, Chip } from '@mui/material';
import { CheckCircle, AutoAwesome, OpenInNew } from '@mui/icons-material';

interface RichCardProps {
  richContent: any;
  onQuickReply?: (reply: string) => void;
  onShiftPickup?: (shift: any) => void;
  onAskNex?: () => void;
  onNavigate?: (page: string) => void;
}

export default function RichCard({ richContent, onQuickReply, onShiftPickup, onAskNex, onNavigate }: RichCardProps) {
  if (!richContent) return null;
  const { type, data } = richContent;

  // Quick replies
  if (type === 'quickReplies') {
    return (
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
        {(data as string[]).map((reply) => (
          <Button
            key={reply}
            variant="outlined"
            size="small"
            onClick={() => onQuickReply?.(reply)}
            sx={{
              borderRadius: 20,
              textTransform: 'none',
              fontSize: 13,
              borderColor: '#2563EB',
              color: '#2563EB',
              '&:hover': { bgcolor: '#EFF6FF', borderColor: '#1D4ED8' },
            }}
          >
            {reply}
          </Button>
        ))}
      </Box>
    );
  }

  // Single card (PTO balance, confirmation, pay stub)
  if (type === 'card') {
    return (
      <Card
        variant="outlined"
        sx={{
          mt: 1,
          borderRadius: 2,
          border: data.status === 'success' ? '1px solid #16A34A' : '1px solid #E5E7EB',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          {/* Title row */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            {data.status === 'success' && (
              <CheckCircle sx={{ color: '#16A34A', fontSize: 18 }} />
            )}
            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: 14 }}>
              {data.title}
            </Typography>
          </Box>

          {data.subtitle && (
            <Typography variant="caption" sx={{ color: '#757575', display: 'block', mb: 1 }}>
              {data.subtitle}
            </Typography>
          )}

          {/* Simple rows */}
          {data.rows && (
            <Box sx={{ mt: 0.5 }}>
              {data.rows.map((row: any, i: number) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.25 }}>
                  <Typography variant="body2" sx={{ color: '#757575', fontSize: 13 }}>
                    {row.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: row.highlight ? 700 : 400,
                      color: row.highlight ? '#2563EB' : '#333',
                      fontSize: row.highlight ? 15 : 13,
                    }}
                  >
                    {row.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Sections (pay stub) */}
          {data.sections && data.sections.map((section: any, si: number) => (
            <Box key={si}>
              {si > 0 && <Divider sx={{ my: 1 }} />}
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: '#757575', letterSpacing: '0.5px', display: 'block', mb: 0.5 }}
              >
                {section.heading}
              </Typography>
              {section.rows.map((row: any, ri: number) => (
                <Box key={ri} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.15 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Typography variant="body2" sx={{ fontSize: 13, fontWeight: row.bold ? 600 : 400 }}>
                      {row.label}
                    </Typography>
                    {row.value && (
                      <Typography variant="body2" sx={{ fontSize: 13, color: '#757575' }}>
                        {row.value}
                      </Typography>
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 13,
                      fontWeight: row.bold ? 600 : 400,
                      color: row.highlight ? '#2563EB' : '#333',
                    }}
                  >
                    {row.amount}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}

          {/* Card action button (e.g. "Open Payroll Dashboard") */}
          {data.action && onNavigate && (
            <Box sx={{ mt: 1.5 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<OpenInNew sx={{ fontSize: 14 }} />}
                onClick={() => onNavigate(data.action.navigateTo)}
                sx={{
                  borderRadius: 16,
                  textTransform: 'none',
                  fontSize: 13,
                  py: 0.5,
                  px: 2,
                  bgcolor: '#2563EB',
                  '&:hover': { bgcolor: '#1D4ED8' },
                }}
              >
                {data.action.label}
              </Button>
            </Box>
          )}

          {/* Ask NEX prompt for paystub cards */}
          {data.sections && onAskNex && (
            <>
              <Divider sx={{ my: 1.5 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ fontSize: 12, color: '#757575' }}>
                  Do you have queries on this?
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AutoAwesome sx={{ fontSize: 14 }} />}
                  onClick={onAskNex}
                  sx={{
                    borderRadius: 16,
                    textTransform: 'none',
                    fontSize: 12,
                    py: 0.25,
                    px: 1.5,
                    borderColor: '#2563EB',
                    color: '#2563EB',
                    '&:hover': { bgcolor: '#EFF6FF', borderColor: '#1D4ED8' },
                  }}
                >
                  Ask NEX
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  // Card list (shifts)
  if (type === 'cardList') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
        {(data as any[]).map((card) => (
          <Card
            key={card.id}
            variant="outlined"
            sx={{ borderRadius: 2, border: '1px solid #E5E7EB' }}
          >
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                {card.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#757575', display: 'block' }}>
                {card.subtitle}
              </Typography>
              <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 0.75 }}>
                {card.detail}
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => onShiftPickup?.(card)}
                sx={{
                  borderRadius: 16,
                  textTransform: 'none',
                  fontSize: 12,
                  py: 0.25,
                  px: 2,
                  bgcolor: '#2563EB',
                  '&:hover': { bgcolor: '#1D4ED8' },
                }}
              >
                {card.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  // Comparison table
  if (type === 'comparison') {
    return (
      <Card variant="outlined" sx={{ mt: 1, borderRadius: 2, border: '1px solid #E5E7EB' }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          {/* Header row */}
          <Box sx={{ display: 'flex', mb: 1, borderBottom: '1px solid #E9E9E9', pb: 0.5 }}>
            {data.headers.map((h: string, i: number) => (
              <Typography
                key={i}
                variant="caption"
                sx={{ flex: i === 0 ? 0.7 : 1, fontWeight: 600, color: '#757575', fontSize: 12 }}
              >
                {h}
              </Typography>
            ))}
          </Box>
          {/* Data rows */}
          {data.rows.map((row: any, i: number) => (
            <Box key={i} sx={{ display: 'flex', py: 0.25 }}>
              <Typography variant="body2" sx={{ flex: 0.7, fontSize: 13, fontWeight: 500 }}>
                {row.label}
              </Typography>
              {row.values.map((v: string, vi: number) => (
                <Typography key={vi} variant="body2" sx={{ flex: 1, fontSize: 13 }}>
                  {v}
                </Typography>
              ))}
            </Box>
          ))}
          {/* Summary */}
          {data.summary && (
            <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #E9E9E9' }}>
              <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 600, color: '#DC2626' }}>
                Difference: -{data.summary.difference}
              </Typography>
              <Typography variant="caption" sx={{ color: '#757575' }}>
                Reason: {data.summary.reason}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  }

  // Schedule table
  if (type === 'schedule') {
    return (
      <Card variant="outlined" sx={{ mt: 1, borderRadius: 2, border: '1px solid #E5E7EB' }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          {(data as any[]).map((row, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: 0.5,
                px: 1,
                borderRadius: 1,
                bgcolor: row.isNew ? '#EFF6FF' : 'transparent',
              }}
            >
              <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500, minWidth: 100 }}>
                {row.date}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 13,
                    color: row.shift === 'OFF' ? '#999' : '#333',
                    fontStyle: row.shift === 'OFF' ? 'italic' : 'normal',
                  }}
                >
                  {row.shift}
                </Typography>
                {row.isNew && (
                  <Chip label="NEW" size="small" sx={{ height: 18, fontSize: 10, bgcolor: '#2563EB', color: 'white' }} />
                )}
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  }

  return null;
}
