export interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  role: string;
  postedBy: string;
  type: 'open' | 'swap';
}

export interface ScheduledShift {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  role: string;
  isNew?: boolean;
}

export const openShifts: Shift[] = [
  {
    id: 'SH-001',
    date: '2026-03-19',
    startTime: '06:00',
    endTime: '14:00',
    location: 'Store #207, Kenner',
    role: 'Delivery Driver',
    postedBy: 'Lisa Tran',
    type: 'open',
  },
  {
    id: 'SH-002',
    date: '2026-03-20',
    startTime: '11:00',
    endTime: '19:00',
    location: 'Store #142, Metairie',
    role: 'Shift Lead',
    postedBy: 'David Kim',
    type: 'swap',
  },
  {
    id: 'SH-003',
    date: '2026-03-21',
    startTime: '16:00',
    endTime: '23:00',
    location: 'Store #142, Metairie',
    role: 'Line Cook',
    postedBy: 'James Chen',
    type: 'open',
  },
];

export const weekSchedule: ScheduledShift[] = [
  { date: '2026-03-17', startTime: '', endTime: '', location: '', role: 'OFF' },
  { date: '2026-03-18', startTime: '11:00', endTime: '19:00', location: 'Store #142', role: 'Shift Lead' },
  { date: '2026-03-19', startTime: '11:00', endTime: '19:00', location: 'Store #142', role: 'Shift Lead' },
  { date: '2026-03-20', startTime: '', endTime: '', location: '', role: 'OFF' },
  { date: '2026-03-21', startTime: '11:00', endTime: '19:00', location: 'Store #142', role: 'Shift Lead', isNew: true },
  { date: '2026-03-22', startTime: '06:00', endTime: '14:00', location: 'Store #142', role: 'Shift Lead' },
  { date: '2026-03-23', startTime: '', endTime: '', location: '', role: 'OFF' },
];
