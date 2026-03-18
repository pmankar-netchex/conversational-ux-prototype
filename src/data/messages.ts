export interface Reaction {
  emoji: string;
  count: number;
  includesUser: boolean;
}

export interface RichContent {
  type: 'card' | 'cardList' | 'comparison' | 'schedule' | 'quickReplies';
  data: any;
}

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  senderRole?: string;
  timestamp: string;
  content: string;
  isPrivate?: boolean;
  isBot?: boolean;
  richContent?: RichContent;
  reactions?: Reaction[];
}

export const channelMessages: Record<string, Message[]> = {
  'store-142-team': [
    {
      id: 'msg-142-1',
      channelId: 'store-142-team',
      senderId: 'james-chen',
      senderName: 'James Chen',
      senderInitials: 'JC',
      senderRole: 'Store Manager',
      timestamp: '2026-03-13T09:15:00',
      content: 'Hey team — reminder that the health inspection is next Tuesday. Please make sure your stations are spotless by end of shift Monday.',
    },
    {
      id: 'msg-142-2',
      channelId: 'store-142-team',
      senderId: 'david-kim',
      senderName: 'David Kim',
      senderInitials: 'DK',
      timestamp: '2026-03-13T09:22:00',
      content: 'Got it, will deep clean the prep area Monday afternoon.',
    },
    {
      id: 'msg-142-3',
      channelId: 'store-142-team',
      senderId: 'sofia-martinez',
      senderName: 'Sofia Martinez',
      senderInitials: 'SM',
      timestamp: '2026-03-13T09:30:00',
      content: '@James do we need to update the cleaning logs too?',
    },
    {
      id: 'msg-142-4',
      channelId: 'store-142-team',
      senderId: 'james-chen',
      senderName: 'James Chen',
      senderInitials: 'JC',
      senderRole: 'Store Manager',
      timestamp: '2026-03-13T09:35:00',
      content: 'Yes please — make sure the last 7 days are filled in on the sheet behind the register.',
    },
  ],
  'dm-james-chen': [
    {
      id: 'msg-jc-1',
      channelId: 'dm-james-chen',
      senderId: 'james-chen',
      senderName: 'James Chen',
      senderInitials: 'JC',
      senderRole: 'Store Manager',
      timestamp: '2026-03-12T16:30:00',
      content: 'Hey Maria, great job handling the lunch rush today. The customer feedback scores were the highest this week.',
    },
    {
      id: 'msg-jc-2',
      channelId: 'dm-james-chen',
      senderId: 'user',
      senderName: 'Maria Rodriguez',
      senderInitials: 'MR',
      timestamp: '2026-03-12T16:45:00',
      content: "Thanks James! The new prep routine is really helping. By the way, I need to update my direct deposit — I switched banks.",
    },
    {
      id: 'msg-jc-3',
      channelId: 'dm-james-chen',
      senderId: 'james-chen',
      senderName: 'James Chen',
      senderInitials: 'JC',
      senderRole: 'Store Manager',
      timestamp: '2026-03-12T16:50:00',
      content: 'No problem. You can do that through the system. Let me know if you need help.',
    },
  ],
  'announcements': [],
  'south-region': [
    {
      id: 'msg-sr-1',
      channelId: 'south-region',
      senderId: 'nicole-moore',
      senderName: 'Nicole Moore',
      senderInitials: 'NM',
      senderRole: 'HR Administrator',
      timestamp: '2026-03-12T10:00:00',
      content: 'Reminder: All stores must complete the quarterly safety checklist by end of day Friday. Links have been sent to all store managers.',
    },
    {
      id: 'msg-sr-2',
      channelId: 'south-region',
      senderId: 'lisa-tran',
      senderName: 'Lisa Tran',
      senderInitials: 'LT',
      senderRole: 'Assistant Manager',
      timestamp: '2026-03-12T10:15:00',
      content: 'Store #207 completed ours yesterday. Happy to share our template if anyone needs it.',
    },
  ],
};
