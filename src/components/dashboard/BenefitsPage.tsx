import React from 'react';
import {
  Box, Typography, Avatar, Card, CardContent, Chip, Divider, Link,
} from '@mui/material';
import {
  CalendarToday, Badge, People, Payment, AccountTree,
} from '@mui/icons-material';
import { employee } from '../../data/employee';
import { useNavStore } from '../../store/navStore';

export default function BenefitsPage() {
  const { setActiveNetchexPage } = useNavStore();

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Page header bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 3,
          py: 1.5,
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <img src="/assets/Logomark@2x.png" alt="" style={{ height: 28 }} />
        <Typography variant="h4" sx={{ fontSize: 18, fontWeight: 400 }}>
          Dashboard
        </Typography>
      </Box>

      {/* Profile header */}
      <Box sx={{ px: 4, pt: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: 36,
              fontWeight: 700,
              bgcolor: '#2563EB',
              border: '4px solid #1A1A2E',
            }}
          >
            {employee.initials}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 400, lineHeight: 1.2 }}>
              {employee.firstName} {employee.lastName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.5px' }}>
                {employee.role.toUpperCase()}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
              <Chip
                label="Active"
                size="small"
                sx={{
                  bgcolor: '#EFF6FF',
                  color: '#2563EB',
                  fontWeight: 600,
                  fontSize: 11,
                  height: 22,
                }}
              />
              <Typography variant="body2" sx={{ color: '#757575', fontSize: 13 }}>
                Full Employee Access
              </Typography>
            </Box>

            {/* Info row */}
            <Box sx={{ display: 'flex', gap: 4, mt: 1.5 }}>
              {[
                { icon: <CalendarToday sx={{ fontSize: 16, color: '#6B7280' }} />, label: 'HIRE DATE', value: '06/15/2024' },
                { icon: <Badge sx={{ fontSize: 16, color: '#6B7280' }} />, label: 'EMPLOYEE CODE', value: employee.employeeCode },
                { icon: <People sx={{ fontSize: 16, color: '#6B7280' }} />, label: 'PRIMARY MANAGER', value: employee.manager.name },
                { icon: <Payment sx={{ fontSize: 16, color: '#6B7280' }} />, label: 'MY NEXT PAYCHECK', value: '03/28/2026' },
                { icon: <AccountTree sx={{ fontSize: 16, color: '#6B7280' }} />, label: 'ORG CHART', value: 'View In Org Chart' },
              ].map((item) => (
                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  {item.icon}
                  <Box>
                    <Typography sx={{ fontSize: 9, fontWeight: 600, color: '#757575', letterSpacing: '0.5px' }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Back link */}
      <Box sx={{ px: 4, pb: 2 }}>
        <Link
          component="button"
          underline="hover"
          onClick={() => setActiveNetchexPage('home')}
          sx={{ fontSize: 13, color: '#2563EB', display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          &lsaquo; Back to My Dashboard
        </Link>
      </Box>

      {/* Benefits Overview card */}
      <Box sx={{ px: 4, pb: 3 }}>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 0.25 }}>
              My Benefits Overview
            </Typography>
            <Typography variant="body2" sx={{ color: '#757575', fontSize: 13, mb: 2 }}>
              {employee.firstName.toUpperCase()} {employee.lastName.toUpperCase()}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', gap: 6 }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#757575', fontSize: 12 }}>
                  Total Cost Per Paycheck
                </Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#2563EB' }}>
                  $24.50
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#757575', fontSize: 12 }}>
                  Active Benefits
                </Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                  2
                </Typography>
              </Box>
            </Box>

            <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 1.5 }}>
              *Total does not include Retirement Plans. Contact your benefits administrator for questions.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Active enrollments */}
      <Box sx={{ px: 4, pb: 4 }}>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Enrollment 1 */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                    Standard PPO Health Plan
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#757575', fontSize: 12 }}>
                    Employee Only &middot; BlueCross BlueShield
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                    $18.75
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#757575' }}>
                    per paycheck
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Enrollment 2 */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                    Basic Dental Plan
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#757575', fontSize: 12 }}>
                    Employee Only &middot; Delta Dental
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                    $5.75
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#757575' }}>
                    per paycheck
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
