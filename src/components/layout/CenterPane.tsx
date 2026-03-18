import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavStore } from '../../store/navStore';
import { useChatStore } from '../../store/chatStore';
import AskAIHome from '../channels/AskAIHome';
import ChatView from '../chat/ChatView';
import AnnouncementFeed from '../channels/AnnouncementFeed';
import RecognitionFeed from '../channels/RecognitionFeed';
import ChannelHeader from '../channels/ChannelHeader';
import EmployeeDashboard from '../dashboard/EmployeeDashboard';
import BenefitsPage from '../dashboard/BenefitsPage';
import TasksPage from '../dashboard/TasksPage';
import DocumentsPage from '../dashboard/DocumentsPage';
import RunPayrollPage from '../dashboard/RunPayrollPage';

const netchexPageMap: Record<string, React.FC> = {
  home: EmployeeDashboard,
  benefits: BenefitsPage,
  tasks: TasksPage,
  documents: DocumentsPage,
  runPayroll: RunPayrollPage,
};

export default function CenterPane() {
  const { activeChannelId, activeNetchexPage } = useNavStore();
  const { isAskAiHome } = useChatStore();

  // Netchex pages
  if (activeNetchexPage) {
    const PageComponent = netchexPageMap[activeNetchexPage];
    if (PageComponent) {
      return <PageComponent />;
    }
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h3" sx={{ textTransform: 'capitalize' }}>
          {activeNetchexPage}
        </Typography>
        <Typography variant="body2" sx={{ color: '#757575' }}>
          Coming soon
        </Typography>
      </Box>
    );
  }

  // Ask AI
  if (activeChannelId === 'ask-nex') {
    if (isAskAiHome) {
      return <AskAIHome />;
    }
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <ChannelHeader channelId="ask-nex" />
        <ChatView channelId="ask-nex" isAskAi />
      </Box>
    );
  }

  // Announcements
  if (activeChannelId === 'announcements') {
    return <AnnouncementFeed />;
  }

  // Recognition
  if (activeChannelId === 'recognition') {
    return <RecognitionFeed />;
  }

  // All other channels
  if (activeChannelId) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <ChannelHeader channelId={activeChannelId} />
        <ChatView channelId={activeChannelId} />
      </Box>
    );
  }

  return null;
}
