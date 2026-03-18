import type { Message } from './messages';

export const recognitions: Message[] = [
  {
    id: 'rec-1',
    channelId: 'recognition',
    senderId: 'james-chen',
    senderName: 'James Chen',
    senderInitials: 'JC',
    senderRole: 'Manager',
    timestamp: '2026-03-12T14:00:00',
    content: 'Huge shout-out to Maria Rodriguez for outstanding customer service scores this month! Your dedication to every guest interaction sets the bar for the whole team.',
    reactions: [
      { emoji: '\uD83C\uDF89', count: 15, includesUser: false },
      { emoji: '\u2764\uFE0F', count: 9, includesUser: true },
      { emoji: '\uD83D\uDC4F', count: 7, includesUser: false },
    ],
  },
  {
    id: 'rec-2',
    channelId: 'recognition',
    senderId: 'nicole-moore',
    senderName: 'Nicole Moore',
    senderInitials: 'NM',
    senderRole: 'Admin',
    timestamp: '2026-03-08T10:00:00',
    content: 'Store #142 team hit 100% on-time delivery for the second week in a row. Amazing teamwork everyone!',
    reactions: [
      { emoji: '\uD83D\uDE80', count: 11, includesUser: false },
      { emoji: '\uD83D\uDC4D', count: 8, includesUser: true },
    ],
  },
  {
    id: 'rec-3',
    channelId: 'recognition',
    senderId: 'lisa-tran',
    senderName: 'Lisa Tran',
    senderInitials: 'LT',
    senderRole: 'Assistant Manager',
    timestamp: '2026-03-03T15:30:00',
    content: 'Sofia Martinez stepped up and covered two extra shifts this week when we were short-staffed. Thank you for being such a reliable teammate!',
    reactions: [
      { emoji: '\uD83D\uDE4C', count: 6, includesUser: false },
      { emoji: '\u2764\uFE0F', count: 4, includesUser: false },
    ],
  },
];
