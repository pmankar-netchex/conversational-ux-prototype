import React, { useState } from 'react';
import {
  Box, Typography, Avatar, Card, CardContent, Chip, Divider, Link,
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Alert,
} from '@mui/material';
import {
  CalendarToday, Badge, People, Payment, AccountTree,
  PlayArrow, Warning, CheckCircle, Schedule,
} from '@mui/icons-material';
import { employee } from '../../data/employee';
import { useNavStore } from '../../store/navStore';
import { useUiStore } from '../../store/uiStore';
import { LOGO_URL } from '../../logoUrl';

const payrollEmployees = [
  { name: 'Maria Rodriguez', role: 'Shift Lead', regularHrs: 80, otHrs: 4, grossPay: 1560.00, status: 'ready' as const },
  { name: 'David Kim', role: 'Delivery Driver', regularHrs: 76, otHrs: 0, grossPay: 1140.00, status: 'ready' as const },
  { name: 'Sofia Martinez', role: 'Team Member', regularHrs: 80, otHrs: 6, grossPay: 1410.00, status: 'overtime' as const },
  { name: 'Lisa Tran', role: 'Asst. Manager', regularHrs: 80, otHrs: 0, grossPay: 1760.00, status: 'ready' as const },
  { name: 'Alex Johnson', role: 'Team Member', regularHrs: 72, otHrs: 0, grossPay: 1080.00, status: 'ready' as const },
  { name: 'Kevin Park', role: 'Delivery Driver', regularHrs: 80, otHrs: 8, grossPay: 1380.00, status: 'overtime' as const },
  { name: 'Rachel Green', role: 'Team Member', regularHrs: 64, otHrs: 0, grossPay: 960.00, status: 'ready' as const },
  { name: 'Chris Bell', role: 'Team Member', regularHrs: 80, otHrs: 0, grossPay: 1190.00, status: 'ready' as const },
];

const totalGross = payrollEmployees.reduce((sum, e) => sum + e.grossPay, 0);
const totalRegularHrs = payrollEmployees.reduce((sum, e) => sum + e.regularHrs, 0);
const totalOtHrs = payrollEmployees.reduce((sum, e) => sum + e.otHrs, 0);
const overtimeCount = payrollEmployees.filter((e) => e.status === 'overtime').length;

export default function RunPayrollPage() {
  const { setActiveNetchexPage } = useNavStore();
  const { showToast } = useUiStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitPayroll = () => {
    setSubmitted(true);
    showToast('Payroll submitted successfully for processing.');
  };

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
        <img src={LOGO_URL} alt="" style={{ height: 28 }} />
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

      {/* Payroll Summary */}
      <Box sx={{ px: 4, pb: 3 }}>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.25 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                Run Payroll
              </Typography>
              <Chip
                icon={<Schedule sx={{ fontSize: 14 }} />}
                label={submitted ? 'Submitted' : 'Ready to Process'}
                size="small"
                sx={{
                  bgcolor: submitted ? '#F0FDF4' : '#EFF6FF',
                  color: submitted ? '#16A34A' : '#2563EB',
                  fontWeight: 600,
                  fontSize: 11,
                  height: 24,
                  '& .MuiChip-icon': { color: submitted ? '#16A34A' : '#2563EB' },
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#757575', fontSize: 13, mb: 2 }}>
              Pay Period: Mar 15 – Mar 28, 2026 &middot; Pay Date: Mar 28, 2026
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Summary stats */}
            <Box sx={{ display: 'flex', gap: 6, mb: 3 }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#757575', fontSize: 12 }}>
                  Total Gross Pay
                </Typography>
                <Typography sx={{ fontSize: 22, fontWeight: 600, color: '#2563EB' }}>
                  ${totalGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#757575', fontSize: 12 }}>
                  Active Employees
                </Typography>
                <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                  {payrollEmployees.length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#757575', fontSize: 12 }}>
                  Total Hours
                </Typography>
                <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                  {totalRegularHrs + totalOtHrs}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#757575', fontSize: 12 }}>
                  Overtime Hours
                </Typography>
                <Typography sx={{ fontSize: 22, fontWeight: 600, color: totalOtHrs > 0 ? '#F59E0B' : '#333' }}>
                  {totalOtHrs}
                </Typography>
              </Box>
            </Box>

            {/* Overtime alert */}
            {overtimeCount > 0 && (
              <Alert
                severity="warning"
                icon={<Warning sx={{ fontSize: 20 }} />}
                sx={{ mb: 2, borderRadius: 1.5, fontSize: 13 }}
              >
                {overtimeCount} employee{overtimeCount > 1 ? 's' : ''} with overtime this period. Review before submitting.
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Employee Breakdown Table */}
      <Box sx={{ px: 4, pb: 3 }}>
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
              Employee Breakdown
            </Typography>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, fontSize: 12, color: '#757575', borderBottom: '2px solid #E5E7EB' }}>Employee</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 12, color: '#757575', borderBottom: '2px solid #E5E7EB' }}>Role</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: 12, color: '#757575', borderBottom: '2px solid #E5E7EB' }}>Regular Hrs</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: 12, color: '#757575', borderBottom: '2px solid #E5E7EB' }}>OT Hrs</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: 12, color: '#757575', borderBottom: '2px solid #E5E7EB' }}>Gross Pay</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, fontSize: 12, color: '#757575', borderBottom: '2px solid #E5E7EB' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payrollEmployees.map((emp) => (
                    <TableRow key={emp.name} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCell sx={{ fontSize: 13, fontWeight: 500 }}>{emp.name}</TableCell>
                      <TableCell sx={{ fontSize: 13, color: '#757575' }}>{emp.role}</TableCell>
                      <TableCell align="right" sx={{ fontSize: 13 }}>{emp.regularHrs}</TableCell>
                      <TableCell align="right" sx={{ fontSize: 13, color: emp.otHrs > 0 ? '#F59E0B' : '#333', fontWeight: emp.otHrs > 0 ? 600 : 400 }}>
                        {emp.otHrs}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: 13, fontWeight: 500 }}>
                        ${emp.grossPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell align="center">
                        {emp.status === 'overtime' ? (
                          <Chip
                            icon={<Warning sx={{ fontSize: 12 }} />}
                            label="OT"
                            size="small"
                            sx={{ height: 22, fontSize: 10, bgcolor: '#FFF7ED', color: '#F59E0B', fontWeight: 600, '& .MuiChip-icon': { color: '#F59E0B' } }}
                          />
                        ) : (
                          <Chip
                            icon={<CheckCircle sx={{ fontSize: 12 }} />}
                            label="Ready"
                            size="small"
                            sx={{ height: 22, fontSize: 10, bgcolor: '#F0FDF4', color: '#16A34A', fontWeight: 600, '& .MuiChip-icon': { color: '#16A34A' } }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Totals row */}
                  <TableRow>
                    <TableCell sx={{ fontSize: 13, fontWeight: 700, borderTop: '2px solid #E5E7EB' }}>Total</TableCell>
                    <TableCell sx={{ borderTop: '2px solid #E5E7EB' }} />
                    <TableCell align="right" sx={{ fontSize: 13, fontWeight: 700, borderTop: '2px solid #E5E7EB' }}>{totalRegularHrs}</TableCell>
                    <TableCell align="right" sx={{ fontSize: 13, fontWeight: 700, color: '#F59E0B', borderTop: '2px solid #E5E7EB' }}>{totalOtHrs}</TableCell>
                    <TableCell align="right" sx={{ fontSize: 13, fontWeight: 700, borderTop: '2px solid #E5E7EB' }}>
                      ${totalGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell sx={{ borderTop: '2px solid #E5E7EB' }} />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Submit button */}
      <Box sx={{ px: 4, pb: 4, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={submitted ? <CheckCircle /> : <PlayArrow />}
          disabled={submitted}
          onClick={handleSubmitPayroll}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 600,
            px: 4,
            py: 1.25,
            bgcolor: submitted ? '#16A34A' : '#2563EB',
            '&:hover': { bgcolor: submitted ? '#16A34A' : '#1D4ED8' },
            '&.Mui-disabled': { bgcolor: '#16A34A', color: 'white', opacity: 0.85 },
          }}
        >
          {submitted ? 'Payroll Submitted' : 'Submit Payroll'}
        </Button>
        {!submitted && (
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontSize: 14,
              fontWeight: 500,
              px: 3,
              borderColor: '#E5E7EB',
              color: '#333',
              '&:hover': { borderColor: '#2563EB', color: '#2563EB' },
            }}
          >
            Save as Draft
          </Button>
        )}
      </Box>
    </Box>
  );
}
