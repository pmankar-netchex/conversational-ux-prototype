import React, { useState } from 'react';
import {
  Box, Typography, Chip, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TableSortLabel, Link, Tabs, Tab,
} from '@mui/material';
import { employee } from '../../data/employee';

const mockTasks = [
  {
    category: 'Onboarding',
    taskName: 'Complete Direct Deposit Setup',
    assignee: `${employee.lastName}, ${employee.firstName}`,
    signOffUsers: employee.manager.name,
    dueDate: '03/20/2026',
    sentDate: '06/15/2024',
    status: 'completed',
  },
  {
    category: 'Compliance',
    taskName: 'Acknowledge Employee Handbook 2026',
    assignee: `${employee.lastName}, ${employee.firstName}`,
    signOffUsers: 'Nicole Moore',
    dueDate: '04/01/2026',
    sentDate: '03/11/2026',
    status: 'pending',
  },
  {
    category: 'Tax',
    taskName: 'Download 2025 1099',
    assignee: `${employee.lastName}, ${employee.firstName}`,
    signOffUsers: '',
    dueDate: '04/15/2026',
    sentDate: '01/15/2026',
    status: 'pending',
  },
];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState(0);

  const pendingTasks = mockTasks.filter((t) => t.status === 'pending');
  const completedTasks = mockTasks.filter((t) => t.status === 'completed');
  const displayTasks = activeTab === 0 ? pendingTasks : completedTasks;

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
          Tasks
        </Typography>
      </Box>

      <Box sx={{ px: 4, pt: 3 }}>
        {/* Title */}
        <Typography sx={{ fontSize: 24, fontWeight: 400, mb: 0.5 }}>
          My Tasks
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 13, color: '#333' }}>
          {employee.firstName.toUpperCase()} {employee.lastName.toUpperCase()}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 13, color: '#333' }}>
          {employee.role.toUpperCase()}
        </Typography>
        <Link href="#" underline="hover" sx={{ fontSize: 13, color: '#2563EB', display: 'block', mt: 0.5, mb: 2 }}>
          {employee.email}
        </Link>

        {/* Tabs */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2.5 }}>
          <Chip
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                THINGS I NEED TO DO
                <Chip
                  label={pendingTasks.length}
                  size="small"
                  sx={{
                    height: 20,
                    minWidth: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    bgcolor: activeTab === 0 ? '#2563EB' : '#E5E7EB',
                    color: activeTab === 0 ? 'white' : '#333',
                  }}
                />
              </Box>
            }
            variant={activeTab === 0 ? 'filled' : 'outlined'}
            onClick={() => setActiveTab(0)}
            sx={{
              borderRadius: 1,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.5px',
              bgcolor: activeTab === 0 ? '#F3F4F6' : 'transparent',
              cursor: 'pointer',
            }}
          />
          <Chip
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                THINGS TO BE DONE FOR ME
                <Chip
                  label={completedTasks.length}
                  size="small"
                  sx={{
                    height: 20,
                    minWidth: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    bgcolor: activeTab === 1 ? '#2563EB' : '#E5E7EB',
                    color: activeTab === 1 ? 'white' : '#333',
                  }}
                />
              </Box>
            }
            variant={activeTab === 1 ? 'filled' : 'outlined'}
            onClick={() => setActiveTab(1)}
            sx={{
              borderRadius: 1,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.5px',
              bgcolor: activeTab === 1 ? '#F3F4F6' : 'transparent',
              cursor: 'pointer',
            }}
          />
        </Box>

        {/* Filter buttons */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {['Filter By Status', 'Filter By Category', 'Show Tasks By Employee', 'View Tasks Due'].map((label) => (
            <Button
              key={label}
              variant="contained"
              size="small"
              sx={{
                bgcolor: '#2563EB',
                color: 'white',
                textTransform: 'none',
                fontSize: 12,
                fontWeight: 500,
                borderRadius: 1,
                px: 1.5,
                py: 0.5,
                '&:hover': { bgcolor: '#1D4ED8' },
              }}
            >
              {label} &#x25BE;
            </Button>
          ))}
        </Box>

        {/* Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {['CATEGORY', 'TASK NAME', 'ASSIGNEE', 'SIGN OFF USERS', 'DUE DATE', 'SENT DATE'].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: '0.5px',
                      color: '#333',
                      borderBottom: '2px solid #E5E7EB',
                      py: 1,
                    }}
                  >
                    <TableSortLabel sx={{ fontSize: 11 }}>
                      {header}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4, color: '#999', fontSize: 14 }}>
                    No tasks found.
                  </TableCell>
                </TableRow>
              ) : (
                displayTasks.map((task, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell sx={{ fontSize: 13 }}>{task.category}</TableCell>
                    <TableCell sx={{ fontSize: 13, color: '#2563EB', cursor: 'pointer' }}>
                      {task.taskName}
                    </TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{task.assignee}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{task.signOffUsers}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{task.dueDate}</TableCell>
                    <TableCell sx={{ fontSize: 13 }}>{task.sentDate}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
