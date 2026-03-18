import type { Message } from './messages';

export const announcements: Message[] = [
  {
    id: 'ann-1',
    channelId: 'announcements',
    senderId: 'nicole-moore',
    senderName: 'Nicole Moore',
    senderInitials: 'NM',
    senderRole: 'Admin',
    timestamp: '2026-03-11T09:00:00',
    content: 'The 2026 Employee Handbook has been updated with new PTO policies. Please review it in the Document Center. Changes are effective April 1.',
    reactions: [
      { emoji: '\uD83D\uDC4D', count: 12, includesUser: false },
      { emoji: '\u2764\uFE0F', count: 5, includesUser: false },
    ],
  },
  {
    id: 'ann-2',
    channelId: 'announcements',
    senderId: 'nicole-moore',
    senderName: 'Nicole Moore',
    senderInitials: 'NM',
    senderRole: 'Admin',
    timestamp: '2026-03-08T08:30:00',
    content: 'Reminder: the next pay date is March 28. Please ensure your timesheets are submitted by March 22. Contact your manager if you have any discrepancies.',
    reactions: [
      { emoji: '\uD83D\uDC4D', count: 8, includesUser: true },
    ],
  },
  {
    id: 'ann-3',
    channelId: 'announcements',
    senderId: 'james-chen',
    senderName: 'James Chen',
    senderInitials: 'JC',
    senderRole: 'Manager',
    timestamp: '2026-03-05T14:00:00',
    content: 'Congratulations to Maria Rodriguez for outstanding customer service scores this month! \uD83C\uDFC6',
    reactions: [
      { emoji: '\uD83C\uDF89', count: 15, includesUser: false },
      { emoji: '\u2764\uFE0F', count: 9, includesUser: true },
      { emoji: '\uD83D\uDC4F', count: 7, includesUser: false },
    ],
  },
  {
    id: 'ann-4',
    channelId: 'announcements',
    senderId: 'system',
    senderName: 'Netchex Support',
    senderInitials: 'NS',
    senderRole: 'System',
    timestamp: '2026-02-28T07:00:00',
    content: 'Netchex will be undergoing scheduled maintenance on Saturday, March 1 from 2:00 AM \u2013 5:00 AM CT. Self-service features will be temporarily unavailable.',
    reactions: [
      { emoji: '\uD83D\uDC4D', count: 3, includesUser: false },
    ],
  },
];
