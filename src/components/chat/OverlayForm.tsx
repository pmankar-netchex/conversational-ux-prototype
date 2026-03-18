import React, { useState } from 'react';
import {
  Box, Typography, IconButton, TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Radio, RadioGroup, FormControlLabel,
  Checkbox, FormGroup, Slide, ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useChatStore } from '../../store/chatStore';
import { handleOverlaySubmit } from '../../flows/flowEngine';
import { useNavStore } from '../../store/navStore';
import { employee } from '../../data/employee';

export default function OverlayForm() {
  const { overlayOpen, overlayType, overlayData, closeOverlay, addMessage, clearActiveFlow } = useChatStore();
  const { activeChannelId } = useNavStore();

  if (!overlayOpen || !overlayType) return null;

  return (
    <>
      {/* Backdrop only over center pane (position: absolute within center pane wrapper) */}
      <Box
        aria-hidden
        onClick={closeOverlay}
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1200,
          bgcolor: 'rgba(0,0,0,0.3)',
          pointerEvents: overlayOpen ? 'auto' : 'none',
          visibility: overlayOpen ? 'visible' : 'hidden',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          pointerEvents: overlayOpen ? 'auto' : 'none',
        }}
      >
        <Slide direction="up" in={overlayOpen}>
          <Box
            sx={{
              maxHeight: '70vh',
              bgcolor: 'white',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
          {overlayType === 'leaveRequest' && (
            <LeaveRequestForm channelId={activeChannelId} />
          )}
          {overlayType === 'shiftPickup' && (
            <ShiftPickupForm channelId={activeChannelId} shiftData={overlayData} />
          )}
          {overlayType === 'directDeposit' && (
            <DirectDepositForm channelId={activeChannelId} />
          )}
          {overlayType === 'address' && (
            <AddressForm channelId={activeChannelId} />
          )}
          {overlayType === 'phone' && (
            <PhoneForm channelId={activeChannelId} />
          )}
          {overlayType === 'emergencyContact' && (
            <EmergencyContactForm channelId={activeChannelId} />
          )}
          </Box>
        </Slide>
      </Box>
    </>
  );
}

function OverlayHeader({ title }: { title: string }) {
  const { closeOverlay, addMessage, clearActiveFlow } = useChatStore();
  const { activeChannelId } = useNavStore();

  const handleClose = () => {
    closeOverlay();
    clearActiveFlow();
    addMessage(activeChannelId, {
      id: `dismiss-${Date.now()}`,
      channelId: activeChannelId,
      senderId: 'bot',
      senderName: 'NEX',
      senderInitials: 'NX',
      timestamp: new Date().toISOString(),
      content: "No worries — let me know if you change your mind.",
      isBot: true,
    });
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, borderBottom: '1px solid #E5E7EB' }}>
      <Typography variant="h4" sx={{ fontSize: 18, fontWeight: 600 }}>
        {title}
      </Typography>
      <IconButton size="small" onClick={handleClose}>
        <Close />
      </IconButton>
    </Box>
  );
}

// ========== LEAVE REQUEST FORM ==========
function LeaveRequestForm({ channelId }: { channelId: string }) {
  const { closeOverlay, addMessage, clearActiveFlow, setIsTyping } = useChatStore();
  const [startDate, setStartDate] = useState('2026-03-24');
  const [endDate, setEndDate] = useState('2026-03-26');
  const [hoursPerDay, setHoursPerDay] = useState('8');
  const [excludedDays, setExcludedDays] = useState(['S', 'HOL']);
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    closeOverlay();
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const msgs = handleOverlaySubmit(channelId, 'leaveRequest', {
        startDate: 'Mar 24',
        endDate: 'Mar 26',
        hoursPerDay: parseInt(hoursPerDay),
        days: 3,
        reason,
      });
      msgs.forEach((m) => addMessage(channelId, m));
      clearActiveFlow();
    }, 800);
  };

  const toggleExcludedDay = (day: string) => {
    setExcludedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <>
      <OverlayHeader title="Request Time Off" />
      <Box sx={{ p: 3, overflow: 'auto', flex: 1 }}>
        <FormControl fullWidth size="small" sx={{ mb: 2.5 }}>
          <InputLabel>Plan Type</InputLabel>
          <Select defaultValue="flexible" label="Plan Type">
            <MenuItem value="flexible">Flexible Time Off</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2" sx={{ mb: 0.75, fontWeight: 500, fontSize: 13 }}>
          What dates are you requesting off?
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
          <TextField
            type="date"
            size="small"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            type="date"
            size="small"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>

        <Typography variant="body2" sx={{ mb: 0.75, fontWeight: 500, fontSize: 13 }}>
          Hours per day requested?
        </Typography>
        <TextField
          type="number"
          size="small"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
          inputProps={{ min: 1, max: 12 }}
          sx={{ width: 120, mb: 2.5 }}
        />

        <Typography variant="body2" sx={{ mb: 0.75, fontWeight: 500, fontSize: 13 }}>
          Excluded Days
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, mb: 2.5 }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S', 'HOL'].map((day, i) => (
            <ToggleButton
              key={`${day}-${i}`}
              value={day}
              selected={excludedDays.includes(day) && (i === 0 || i === 6 || day === 'HOL')}
              onChange={() => toggleExcludedDay(day)}
              sx={{
                width: day === 'HOL' ? 48 : 36,
                height: 36,
                fontSize: 12,
                border: '1px solid #E5E7EB',
                '&.Mui-selected': { bgcolor: '#EFF6FF', color: '#2563EB', borderColor: '#2563EB' },
              }}
            >
              {day}
            </ToggleButton>
          ))}
        </Box>

        <TextField
          label="Reason (optional)"
          placeholder="e.g., Family vacation"
          multiline
          rows={2}
          size="small"
          fullWidth
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>
      <Box sx={{ px: 3, py: 2, borderTop: '1px solid #E5E7EB' }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ borderRadius: 8, py: 1.25, bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
        >
          Submit Request
        </Button>
      </Box>
    </>
  );
}

// ========== SHIFT PICKUP FORM ==========
function ShiftPickupForm({ channelId, shiftData }: { channelId: string; shiftData: Record<string, any> }) {
  const { closeOverlay, addMessage, clearActiveFlow, setIsTyping } = useChatStore();
  const [note, setNote] = useState('');
  const shift = shiftData.shift || {};

  const handleSubmit = () => {
    closeOverlay();
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const msgs = handleOverlaySubmit(channelId, 'shiftPickup', { shift, note });
      msgs.forEach((m) => addMessage(channelId, m));
      clearActiveFlow();
    }, 800);
  };

  return (
    <>
      <OverlayHeader title="Confirm Shift Pickup" />
      <Box sx={{ p: 3, overflow: 'auto', flex: 1 }}>
        {[
          { label: 'Shift Date', value: shift.title?.split(' | ')[0] || 'Friday, Mar 20, 2026' },
          { label: 'Time', value: shift.title?.split(' | ')[1] || '11:00 AM – 7:00 PM' },
          { label: 'Location', value: shift.subtitle?.split(' — ')[0] || 'Store #142, Metairie' },
          { label: 'Role', value: shift.subtitle?.split(' — ')[1] || 'Shift Lead' },
        ].map((field) => (
          <Box key={field.label} sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: '#757575', fontWeight: 500, display: 'block', mb: 0.25 }}>
              {field.label}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 500 }}>
              {field.value}
            </Typography>
          </Box>
        ))}
        <TextField
          label="Note to Manager (optional)"
          placeholder="Any notes for your manager?"
          multiline
          rows={2}
          size="small"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Box>
      <Box sx={{ px: 3, py: 2, borderTop: '1px solid #E5E7EB' }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ borderRadius: 8, py: 1.25, bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
        >
          Confirm Pickup
        </Button>
      </Box>
    </>
  );
}

// ========== DIRECT DEPOSIT FORM ==========
function DirectDepositForm({ channelId }: { channelId: string }) {
  const { closeOverlay, addMessage, clearActiveFlow, setIsTyping } = useChatStore();
  const [bankName, setBankName] = useState(employee.directDeposit.bankName);
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');
  const [accountType, setAccountType] = useState('Checking');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = () => {
    closeOverlay();
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const msgs = handleOverlaySubmit(channelId, 'directDeposit', {
        bankName, routingNumber: routing, accountNumber: account, accountType,
      });
      msgs.forEach((m) => addMessage(channelId, m));
      clearActiveFlow();
    }, 800);
  };

  return (
    <>
      <OverlayHeader title="Update Direct Deposit" />
      <Box sx={{ p: 3, overflow: 'auto', flex: 1 }}>
        <TextField label="Bank Name" size="small" fullWidth value={bankName} onChange={(e) => setBankName(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="Routing Number" size="small" fullWidth value={routing} onChange={(e) => setRouting(e.target.value)} placeholder="9 digits" sx={{ mb: 2 }} />
        <TextField label="Account Number" size="small" fullWidth type="password" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="6-17 digits" sx={{ mb: 2 }} />
        <FormControl sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500, mb: 0.5 }}>Account Type</Typography>
          <RadioGroup row value={accountType} onChange={(e) => setAccountType(e.target.value)}>
            <FormControlLabel value="Checking" control={<Radio size="small" />} label="Checking" />
            <FormControlLabel value="Savings" control={<Radio size="small" />} label="Savings" />
          </RadioGroup>
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} size="small" />}
          label="I confirm these details are correct"
          sx={{ '& .MuiTypography-root': { fontSize: 13 } }}
        />
      </Box>
      <Box sx={{ px: 3, py: 2, borderTop: '1px solid #E5E7EB' }}>
        <Button
          variant="contained"
          fullWidth
          disabled={!confirmed}
          onClick={handleSubmit}
          sx={{ borderRadius: 8, py: 1.25, bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
        >
          Update Direct Deposit
        </Button>
      </Box>
    </>
  );
}

// ========== ADDRESS FORM ==========
function AddressForm({ channelId }: { channelId: string }) {
  const { closeOverlay, addMessage, clearActiveFlow, setIsTyping } = useChatStore();
  const [street, setStreet] = useState('1155 Hwy 190');
  const [apt, setApt] = useState('');
  const [city, setCity] = useState('Metairie');
  const [state, setState] = useState('LA');
  const [zip, setZip] = useState('70001');

  const handleSubmit = () => {
    closeOverlay();
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const msgs = handleOverlaySubmit(channelId, 'address', { street, apt, city, state, zip });
      msgs.forEach((m) => addMessage(channelId, m));
      clearActiveFlow();
    }, 800);
  };

  return (
    <>
      <OverlayHeader title="Update Address" />
      <Box sx={{ p: 3, overflow: 'auto', flex: 1 }}>
        <TextField label="Street Address" size="small" fullWidth value={street} onChange={(e) => setStreet(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="Apt / Suite" size="small" fullWidth value={apt} onChange={(e) => setApt(e.target.value)} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField label="City" size="small" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
          <TextField label="State" size="small" sx={{ width: 100 }} value={state} onChange={(e) => setState(e.target.value)} />
          <TextField label="ZIP Code" size="small" sx={{ width: 120 }} value={zip} onChange={(e) => setZip(e.target.value)} />
        </Box>
      </Box>
      <Box sx={{ px: 3, py: 2, borderTop: '1px solid #E5E7EB' }}>
        <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ borderRadius: 8, py: 1.25, bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}>
          Update Address
        </Button>
      </Box>
    </>
  );
}

// ========== PHONE FORM ==========
function PhoneForm({ channelId }: { channelId: string }) {
  const { closeOverlay, addMessage, clearActiveFlow, setIsTyping } = useChatStore();
  const [phone, setPhone] = useState(employee.phone);
  const [shareWithTeam, setShareWithTeam] = useState(true);

  const handleSubmit = () => {
    closeOverlay();
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const msgs = handleOverlaySubmit(channelId, 'phone', { phone, shareWithTeam });
      msgs.forEach((m) => addMessage(channelId, m));
      clearActiveFlow();
    }, 800);
  };

  return (
    <>
      <OverlayHeader title="Update Phone Number" />
      <Box sx={{ p: 3, overflow: 'auto', flex: 1 }}>
        <TextField label="Cell Phone" size="small" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ mb: 2 }} />
        <FormControlLabel
          control={<Checkbox checked={shareWithTeam} onChange={(e) => setShareWithTeam(e.target.checked)} size="small" />}
          label="Share with team"
          sx={{ '& .MuiTypography-root': { fontSize: 13 } }}
        />
      </Box>
      <Box sx={{ px: 3, py: 2, borderTop: '1px solid #E5E7EB' }}>
        <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ borderRadius: 8, py: 1.25, bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}>
          Update Phone Number
        </Button>
      </Box>
    </>
  );
}

// ========== EMERGENCY CONTACT FORM ==========
function EmergencyContactForm({ channelId }: { channelId: string }) {
  const { closeOverlay, addMessage, clearActiveFlow, setIsTyping } = useChatStore();
  const [name, setName] = useState(employee.emergencyContact.name);
  const [relationship, setRelationship] = useState(employee.emergencyContact.relationship);
  const [phone, setPhone] = useState(employee.emergencyContact.phone);

  const handleSubmit = () => {
    closeOverlay();
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const msgs = handleOverlaySubmit(channelId, 'emergencyContact', { name, relationship, phone });
      msgs.forEach((m) => addMessage(channelId, m));
      clearActiveFlow();
    }, 800);
  };

  return (
    <>
      <OverlayHeader title="Update Emergency Contact" />
      <Box sx={{ p: 3, overflow: 'auto', flex: 1 }}>
        <TextField label="Contact Name" size="small" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Relationship</InputLabel>
          <Select value={relationship} label="Relationship" onChange={(e) => setRelationship(e.target.value)}>
            {['Spouse', 'Parent', 'Sibling', 'Child', 'Other'].map((r) => (
              <MenuItem key={r} value={r}>{r}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label="Phone Number" size="small" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Box>
      <Box sx={{ px: 3, py: 2, borderTop: '1px solid #E5E7EB' }}>
        <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ borderRadius: 8, py: 1.25, bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}>
          Update Emergency Contact
        </Button>
      </Box>
    </>
  );
}
