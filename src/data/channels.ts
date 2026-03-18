export interface ChannelMember {
  name: string;
  initials: string;
  role?: string;
  isOnline?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  type: 'ai' | 'announcement' | 'recognition' | 'group' | 'dm';
  icon?: string;
  memberCount?: number;
  unreadCount: number;
  isInteractive: boolean;
  description?: string;
  members?: ChannelMember[];
  hidden?: boolean;
}

export const channels: Channel[] = [
  {
    id: 'ask-nex',
    name: '#ask-nex',
    type: 'ai',
    icon: 'AutoAwesome',
    unreadCount: 0,
    isInteractive: true,
    description: 'Your AI-powered assistant for HR, payroll, and more.',
  },
  {
    id: 'announcements',
    name: '#announcements',
    type: 'announcement',
    icon: 'Campaign',
    memberCount: 124,
    unreadCount: 2,
    isInteractive: false,
    description: 'Company-wide announcements and updates.',
  },
  {
    id: 'recognition',
    name: '#recognition',
    type: 'recognition',
    icon: 'EmojiEvents',
    memberCount: 124,
    unreadCount: 1,
    isInteractive: false,
    description: 'Celebrate wins and shout-outs.',
  },
  {
    id: 'south-region',
    name: '#south-region',
    type: 'group',
    icon: 'Tag',
    memberCount: 45,
    unreadCount: 5,
    isInteractive: false,
  },
  {
    id: 'store-142-team',
    name: '#store-142-team',
    type: 'group',
    icon: 'Tag',
    memberCount: 8,
    unreadCount: 3,
    isInteractive: true,
    members: [
      { name: 'James Chen', initials: 'JC', role: 'Store Manager', isOnline: true },
      { name: 'Maria Rodriguez', initials: 'MR', role: 'Shift Lead', isOnline: true },
      { name: 'Sofia Martinez', initials: 'SM', role: 'Team Member', isOnline: true },
      { name: 'David Kim', initials: 'DK', role: 'Delivery Driver', isOnline: false },
    ],
  },
  {
    id: 'dm-james-chen',
    name: 'James Chen',
    type: 'dm',
    unreadCount: 1,
    isInteractive: true,
    members: [
      { name: 'James Chen', initials: 'JC', role: 'Store Manager', isOnline: true },
    ],
  },
  {
    id: 'dm-sofia-martinez',
    name: 'Sofia Martinez',
    type: 'dm',
    unreadCount: 0,
    isInteractive: false,
    members: [
      { name: 'Sofia Martinez', initials: 'SM', role: 'Team Member', isOnline: false },
    ],
  },
  // Hidden channels (shown on "View more")
  {
    id: 'store-207-team',
    name: '#store-207-team',
    type: 'group',
    icon: 'Tag',
    memberCount: 6,
    unreadCount: 0,
    isInteractive: false,
    hidden: true,
  },
  {
    id: 'new-hires-2026',
    name: '#new-hires-2026',
    type: 'group',
    icon: 'Tag',
    memberCount: 12,
    unreadCount: 0,
    isInteractive: false,
    hidden: true,
  },
  {
    id: 'dm-david-kim',
    name: 'David Kim',
    type: 'dm',
    unreadCount: 0,
    isInteractive: false,
    hidden: true,
    members: [
      { name: 'David Kim', initials: 'DK', role: 'Delivery Driver', isOnline: false },
    ],
  },
  {
    id: 'dm-lisa-tran',
    name: 'Lisa Tran',
    type: 'dm',
    unreadCount: 0,
    isInteractive: false,
    hidden: true,
    members: [
      { name: 'Lisa Tran', initials: 'LT', role: 'Assistant Manager', isOnline: false },
    ],
  },
];
