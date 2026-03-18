import React, { useState } from 'react';
import {
  Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel,
  Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TableSortLabel, IconButton, InputAdornment,
} from '@mui/material';
import {
  Search, MoreVert, Description as DescIcon, PictureAsPdf,
} from '@mui/icons-material';

const mockDocuments = [
  {
    name: 'Netchex Handbook 2025.docx',
    type: 'docx',
    uploadDate: '11/13/2025, 02:56:25 AM',
    owner: 'NICOLE MOORE',
    whoCanSee: 'Admin, Manager, Empl...',
    linkedTo: "Domino's SE Louisiana LLC",
    fileType: 'Organization/Company',
  },
  {
    name: '401K Plan Guide.pdf',
    type: 'pdf',
    uploadDate: '11/13/2025, 02:44:57 AM',
    owner: 'NICOLE MOORE',
    whoCanSee: 'Admin, Manager, Empl...',
    linkedTo: "Domino's SE Louisiana LLC",
    fileType: 'Organization/Company',
  },
  {
    name: '401K Employer Match Information.pdf',
    type: 'pdf',
    uploadDate: '11/13/2025, 02:44:57 AM',
    owner: 'NICOLE MOORE',
    whoCanSee: 'Admin, Manager, Empl...',
    linkedTo: "Domino's SE Louisiana LLC",
    fileType: 'Organization/Company',
  },
  {
    name: '2026 Employee Benefit Guide.pdf',
    type: 'pdf',
    uploadDate: '11/13/2025, 02:43:03 AM',
    owner: 'NICOLE MOORE',
    whoCanSee: 'Admin, Manager, Empl...',
    linkedTo: "Domino's SE Louisiana LLC",
    fileType: 'Organization/Company',
  },
  {
    name: '2025 - 2026 Payroll Calendar.pdf',
    type: 'pdf',
    uploadDate: '04/30/2025, 07:57:24 PM',
    owner: '',
    whoCanSee: 'Admin, Manager, Empl...',
    linkedTo: "Domino's SE Louisiana LLC",
    fileType: 'Organization/Company',
  },
];

export default function DocumentsPage() {
  const [search, setSearch] = useState('');

  const filtered = mockDocuments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

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
          Document Center
        </Typography>
      </Box>

      <Box sx={{ px: 4, pt: 3 }}>
        {/* Title */}
        <Typography sx={{ fontSize: 24, fontWeight: 400, mb: 0.5 }}>
          Document Center
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575', fontSize: 13, mb: 2.5 }}>
          Easily access, manage and store all your important files in one centralized location.
        </Typography>

        {/* Filters row */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2.5, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 18, color: '#6B7280' }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: 180, '& .MuiOutlinedInput-root': { fontSize: 13 } }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ fontSize: 13 }}>Select Companies</InputLabel>
            <Select label="Select Companies" sx={{ fontSize: 13 }}>
              <MenuItem value="all" sx={{ fontSize: 13 }}>All Companies</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel sx={{ fontSize: 13 }}>File Type</InputLabel>
            <Select label="File Type" sx={{ fontSize: 13 }}>
              <MenuItem value="all" sx={{ fontSize: 13 }}>All</MenuItem>
              <MenuItem value="pdf" sx={{ fontSize: 13 }}>PDF</MenuItem>
              <MenuItem value="docx" sx={{ fontSize: 13 }}>DOCX</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel sx={{ fontSize: 13 }}>Tag</InputLabel>
            <Select label="Tag" sx={{ fontSize: 13 }}>
              <MenuItem value="all" sx={{ fontSize: 13 }}>All</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Show Expired/Archived"
            sx={{ '& .MuiTypography-root': { fontSize: 12 } }}
          />
        </Box>

        {/* Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox size="small" />
                </TableCell>
                {['Name', 'Upload Date', 'Owner', 'Who Can See', 'Linked to', 'File Type'].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: '#333',
                      borderBottom: '2px solid #E5E7EB',
                      py: 1,
                    }}
                  >
                    <TableSortLabel sx={{ fontSize: 12 }}>
                      {header}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell sx={{ borderBottom: '2px solid #E5E7EB', width: 40 }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((doc, idx) => (
                <TableRow key={idx} hover sx={{ cursor: 'pointer' }}>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {doc.type === 'pdf' ? (
                        <PictureAsPdf sx={{ fontSize: 20, color: '#DC2626' }} />
                      ) : (
                        <DescIcon sx={{ fontSize: 20, color: '#2563EB' }} />
                      )}
                      <Typography sx={{ fontSize: 13 }}>{doc.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: 12, color: '#757575' }}>{doc.uploadDate}</TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{doc.owner}</TableCell>
                  <TableCell sx={{ fontSize: 12, color: '#757575' }}>{doc.whoCanSee}</TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{doc.linkedTo}</TableCell>
                  <TableCell sx={{ fontSize: 12 }}>{doc.fileType}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <MoreVert sx={{ fontSize: 18 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer */}
        <Typography variant="caption" sx={{ color: '#757575', display: 'block', mt: 1.5 }}>
          Showing 1 to {filtered.length} of {filtered.length} entries
        </Typography>
      </Box>
    </Box>
  );
}
