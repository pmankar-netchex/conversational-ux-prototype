import React, { useState } from 'react';
import {
  Box, Typography, Avatar, Card, CardContent, Button, Link, List,
  ListItemButton, ListItemIcon, ListItemText, Divider, Paper, Chip,
  useMediaQuery, Collapse,
} from '@mui/material';
import {
  OpenInNew, Star, Payment, EventAvailable, Business, People,
  Campaign, FolderOpen, Link as LinkIcon, BarChart, Report,
  Gavel, Poll, ThumbUp, QuestionAnswer, VisibilityOff,
  HealthAndSafety, SwapHoriz, Summarize, AccountBalance,
  Remove, AttachMoney, RequestQuote, Description, Person,
  FamilyRestroom, Emergency, AccountCircle, ExpandMore, ExpandLess,
} from '@mui/icons-material';
import { employee } from '../../data/employee';
import { ptoBalance } from '../../data/ptoBalances';
import { useNavStore } from '../../store/navStore';

const quickLinks = [
  { label: 'Access Your Pay Early', icon: <OpenInNew sx={{ fontSize: 16 }} />, external: true },
  { label: 'Buy Now Pay Later', icon: <OpenInNew sx={{ fontSize: 16 }} />, external: true },
  { label: 'NetLearn', icon: <OpenInNew sx={{ fontSize: 16 }} />, external: true },
  { label: 'Tasks', icon: null },
];

const sidebarSections = [
  {
    title: 'Performance',
    items: [
      { label: 'Reviews', icon: <Star sx={{ fontSize: 16 }} /> },
      { label: 'Violation Points', icon: <Report sx={{ fontSize: 16 }} /> },
      { label: 'Disciplinary Actions', icon: <Gavel sx={{ fontSize: 16 }} /> },
    ],
  },
  {
    title: 'Engagement',
    items: [
      { label: 'Surveys', icon: <Poll sx={{ fontSize: 16 }} /> },
      { label: 'Recognition', icon: <ThumbUp sx={{ fontSize: 16 }} /> },
      { label: 'AskHR', icon: <QuestionAnswer sx={{ fontSize: 16 }} /> },
      { label: 'Anonymous Reporting', icon: <VisibilityOff sx={{ fontSize: 16 }} /> },
    ],
  },
  {
    title: 'Benefits',
    items: [
      { label: 'Benefits Overview', icon: <HealthAndSafety sx={{ fontSize: 16 }} /> },
      { label: 'Change My Benefits', icon: <SwapHoriz sx={{ fontSize: 16 }} /> },
      { label: 'Current Benefits Summary', icon: <Summarize sx={{ fontSize: 16 }} /> },
    ],
  },
  {
    title: 'Payroll',
    items: [
      { label: 'Compensation', icon: <AttachMoney sx={{ fontSize: 16 }} /> },
      { label: 'Deductions', icon: <Remove sx={{ fontSize: 16 }} /> },
      { label: 'Direct Deposit Accounts', icon: <AccountBalance sx={{ fontSize: 16 }} /> },
      { label: 'Other Scheduled Earnings', icon: <RequestQuote sx={{ fontSize: 16 }} /> },
      { label: 'Taxes', icon: <Description sx={{ fontSize: 16 }} /> },
      { label: 'Total Comp Statement', icon: <Summarize sx={{ fontSize: 16 }} /> },
      { label: 'Year End Tax Forms', icon: <Description sx={{ fontSize: 16 }} /> },
    ],
  },
  {
    title: 'Personal Info',
    items: [
      { label: 'Demographics', icon: <Person sx={{ fontSize: 16 }} /> },
      { label: 'Dependents/Beneficiaries', icon: <FamilyRestroom sx={{ fontSize: 16 }} /> },
      { label: 'Emergency Contacts', icon: <Emergency sx={{ fontSize: 16 }} /> },
      { label: 'Profile', icon: <AccountCircle sx={{ fontSize: 16 }} /> },
    ],
  },
];

function CollapsibleSection({ title, items }: { title: string; items: { label: string; icon: React.ReactElement }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ mt: 0.5 }}>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          py: 0.5,
          px: 2,
          minHeight: 32,
          '&:hover': { bgcolor: '#F3F4F6' },
        }}
      >
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            variant: 'overline',
            sx: { fontSize: 11, fontWeight: 600, color: '#757575', lineHeight: 1.5 },
          }}
        />
        {open ? <ExpandLess sx={{ fontSize: 16, color: '#757575' }} /> : <ExpandMore sx={{ fontSize: 16, color: '#757575' }} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {items.map((item) => (
          <Box
            key={item.label}
            sx={{
              px: 2,
              pl: 3,
              py: 0.4,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#F3F4F6' },
            }}
          >
            <Box sx={{ color: '#6B7280' }}>{item.icon}</Box>
            <Typography variant="body2" sx={{ fontSize: 13, color: '#333' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Collapse>
    </Box>
  );
}

export default function EmployeeDashboard() {
  const { setActiveChannel } = useNavStore();
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Left sidebar - Quick Links (hidden on mobile) */}
      {!isMobile && (
      <Box
        sx={{
          width: 220,
          bgcolor: '#F9FAFB',
          borderRight: '1px solid #E5E7EB',
          overflow: 'auto',
          py: 2,
          flexShrink: 0,
        }}
      >
        <Typography variant="h4" sx={{ px: 2, mb: 1, fontSize: 14, fontWeight: 600 }}>
          My Quick Links
        </Typography>
        {quickLinks.map((link) => (
          <Box
            key={link.label}
            sx={{
              px: 2,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#F3F4F6' },
            }}
          >
            <Typography variant="body2" sx={{ fontSize: 13, color: '#2563EB' }}>
              {link.label}
            </Typography>
            {link.external && link.icon}
          </Box>
        ))}

        <Divider sx={{ my: 1, mx: 1.5 }} />

        {sidebarSections.map((section) => (
          <CollapsibleSection key={section.title} title={section.title} items={section.items} />
        ))}
      </Box>
      )}

      {/* Main content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: isMobile ? 2 : 3 }}>
        {/* Welcome header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          <Avatar sx={{ width: 64, height: 64, fontSize: 24, fontWeight: 600, bgcolor: '#2563EB' }}>
            {employee.initials}
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ fontSize: 22, fontWeight: 500 }}>
              Welcome back, {employee.firstName.toUpperCase()}!
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>
              {employee.role} &middot; {employee.company}
            </Typography>
            <Typography variant="caption" sx={{ color: '#999' }}>
              {employee.address} &middot; {employee.email}
            </Typography>
          </Box>
          <Button variant="text" size="small" sx={{ ml: 'auto', color: '#2563EB', fontSize: 13 }}>
            Edit Info
          </Button>
        </Box>

        {/* Access pay early banner */}
        <Paper
          sx={{
            bgcolor: '#6BBF59',
            color: 'white',
            p: 2,
            borderRadius: 2,
            mb: 3,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
            Access your pay early!
          </Typography>
          <Typography sx={{ fontSize: 20 }}>&rarr;</Typography>
        </Paper>

        {/* To Do */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>TO DO</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ fontSize: 13 }}>Download 2025 1099</Typography>
              <Button size="small" variant="outlined" sx={{ fontSize: 12, borderRadius: 16 }}>
                View
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Grid of widgets */}
        <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 2 }}>
          {/* Recognition */}
          <Card>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>Recognition</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="3" size="small" sx={{ bgcolor: '#2563EB', color: 'white', fontWeight: 600 }} />
                <Typography variant="body2" sx={{ fontSize: 13 }}>kudos received this month</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>Company Info</Typography>
              {['Org Chart', 'AskHR', 'Anonymous Reporting', 'Company Files', 'Company Links'].map((item) => (
                <Typography key={item} variant="body2" sx={{ fontSize: 13, color: '#2563EB', cursor: 'pointer', py: 0.25 }}>
                  {item}
                </Typography>
              ))}
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>View Payment History</Typography>
              <Typography variant="body2" sx={{ fontSize: 13, color: '#757575' }}>Latest Paycheck</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, fontSize: 15 }}>$1,082.06</Typography>
              <Typography variant="caption" sx={{ color: '#757575', display: 'block' }}>
                Pay Period: Mar 3 – Mar 14
              </Typography>
              <Typography variant="caption" sx={{ color: '#757575' }}>
                Paid On: Mar 14, 2026
              </Typography>
            </CardContent>
          </Card>

          {/* Time Off */}
          <Card>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>View Time Off</Typography>
              <Typography variant="body2" sx={{ fontSize: 13, color: '#757575' }}>
                {ptoBalance.planName}
              </Typography>
              <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#2563EB' }}>
                {ptoBalance.availableHours}
              </Typography>
              <Typography variant="caption" sx={{ color: '#757575', display: 'block', mb: 1 }}>HOURS</Typography>
              <Button
                variant="contained"
                size="small"
                onClick={() => setActiveChannel('ask-nex')}
                sx={{ borderRadius: 16, fontSize: 12, bgcolor: '#2563EB' }}
              >
                Request Time Off
              </Button>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card sx={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="h4" sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>Announcements</Typography>
              <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500 }}>
                NETCHEX Files Updated!
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 13, color: '#757575' }}>
                Please review the updated files for any benefit-related information you need.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
