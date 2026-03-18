export interface ChatSession {
  id: string;
  title: string;
  lastMessagePreview: string;
  timestamp: string;
  messageCount: number;
}

export const chatSessions: ChatSession[] = [
  {
    id: 'session-1',
    title: 'PTO Request \u2014 Mar 10',
    lastMessagePreview: 'Your time-off request has been submitted!',
    timestamp: '2026-03-10T14:30:00',
    messageCount: 6,
  },
  {
    id: 'session-2',
    title: 'Pay Stub Review \u2014 Feb 28',
    lastMessagePreview: 'Your Feb 28 check was $1,163.79 via direct deposit.',
    timestamp: '2026-02-28T16:00:00',
    messageCount: 4,
  },
  {
    id: 'session-3',
    title: 'Shift Pickup \u2014 Feb 20',
    lastMessagePreview: 'Shift confirmed for Feb 22, 6 AM \u2013 2 PM.',
    timestamp: '2026-02-20T11:00:00',
    messageCount: 5,
  },
  {
    id: 'session-4',
    title: 'Address Update \u2014 Jan 15',
    lastMessagePreview: 'Your address has been updated successfully.',
    timestamp: '2026-01-15T09:30:00',
    messageCount: 3,
  },
  {
    id: 'session-5',
    title: 'Benefits Question \u2014 Jan 5',
    lastMessagePreview: 'Your current health plan is the Standard PPO.',
    timestamp: '2026-01-05T10:00:00',
    messageCount: 4,
  },
];
