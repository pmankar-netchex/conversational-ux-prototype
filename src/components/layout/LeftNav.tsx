import React from 'react';
import {
  Box, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Divider, Avatar, Badge, IconButton, Collapse,
  useMediaQuery,
} from '@mui/material';
import {
  AutoAwesome, Campaign, Tag, Menu as MenuIcon,
  Add, Home, Assignment, TrendingUp, Favorite,
  HealthAndSafety, AccountBalance, Description,
  ExpandMore, ExpandLess, EmojiEvents,
} from '@mui/icons-material';
import { useNavStore } from '../../store/navStore';
import { channels } from '../../data/channels';

const iconMap: Record<string, React.ReactElement> = {
  AutoAwesome: <AutoAwesome sx={{ fontSize: 20 }} />,
  Campaign: <Campaign sx={{ fontSize: 20 }} />,
  Tag: <Tag sx={{ fontSize: 20 }} />,
  EmojiEvents: <EmojiEvents sx={{ fontSize: 20 }} />,
};

const netchexItems = [
  { id: 'home', label: 'Home', icon: <Home sx={{ fontSize: 20 }} /> },
  { id: 'tasks', label: 'Tasks', icon: <Assignment sx={{ fontSize: 20 }} /> },
  { id: 'performance', label: 'Performance', icon: <TrendingUp sx={{ fontSize: 20 }} /> },
  { id: 'engagement', label: 'Engagement', icon: <Favorite sx={{ fontSize: 20 }} /> },
  { id: 'benefits', label: 'Benefits', icon: <HealthAndSafety sx={{ fontSize: 20 }} /> },
  { id: 'payroll', label: 'Payroll', icon: <AccountBalance sx={{ fontSize: 20 }} /> },
  { id: 'documents', label: 'Documents', icon: <Description sx={{ fontSize: 20 }} /> },
];

export default function LeftNav() {
  const {
    leftNavOpen, activeChannelId, activeNetchexPage,
    showMoreGroups, showMoreDMs,
    toggleLeftNav, setActiveChannel, setActiveNetchexPage,
    toggleShowMoreGroups, toggleShowMoreDMs,
    setLeftNavOpen,
  } = useNavStore();
  const isMobile = useMediaQuery('(max-width:768px)');

  // Group channels by type
  const aiChannel = channels.find((c) => c.type === 'ai');
  const announcementChannels = channels.filter((c) => c.type === 'announcement');
  const recognitionChannels = channels.filter((c) => c.type === 'recognition');
  const groupChannels = channels.filter((c) => c.type === 'group' && !c.hidden);
  const dmChannels = channels.filter((c) => c.type === 'dm' && !c.hidden);
  const hiddenGroupChannels = channels.filter((c) => c.type === 'group' && c.hidden);
  const hiddenDmChannels = channels.filter((c) => c.type === 'dm' && c.hidden);

  const handleChannelClick = (id: string) => {
    setActiveChannel(id);
    if (isMobile) setLeftNavOpen(false);
  };

  const handleNetchexClick = (id: string) => {
    setActiveNetchexPage(id);
    if (isMobile) setLeftNavOpen(false);
  };

  const navHeaderHeight = 48;

  const renderChannelItem = (channel: typeof channels[0]) => (
    <ListItemButton
      key={channel.id}
      selected={activeChannelId === channel.id}
      onClick={() => handleChannelClick(channel.id)}
      sx={{
        borderRadius: 1,
        mx: 0.5,
        py: 0.5,
        minHeight: 36,
        borderLeft: activeChannelId === channel.id ? '3px solid #2563EB' : '3px solid transparent',
        bgcolor: activeChannelId === channel.id ? '#EFF6FF' : 'transparent',
        '&:hover': { bgcolor: activeChannelId === channel.id ? '#EFF6FF' : '#F3F4F6' },
      }}
    >
      <ListItemIcon sx={{ minWidth: 32 }}>
        {channel.type === 'dm' ? (
          <Avatar sx={{ width: 24, height: 24, fontSize: 10, bgcolor: '#6B7280' }}>
            {channel.members?.[0]?.initials || '?'}
          </Avatar>
        ) : (
          <Box sx={{ color: activeChannelId === channel.id ? '#2563EB' : '#6B7280' }}>
            {channel.icon ? iconMap[channel.icon] : <Tag sx={{ fontSize: 20 }} />}
          </Box>
        )}
      </ListItemIcon>
      <ListItemText
        primary={channel.name}
        primaryTypographyProps={{
          fontSize: '0.875rem',
          fontWeight: activeChannelId === channel.id ? 600 : 400,
          color: activeChannelId === channel.id ? '#2563EB' : '#333',
          noWrap: true,
        }}
      />
      {channel.unreadCount > 0 && (
        <Badge
          badgeContent={channel.unreadCount}
          color="primary"
          sx={{ '& .MuiBadge-badge': { fontSize: 11, minWidth: 20, height: 20 } }}
        />
      )}
    </ListItemButton>
  );

  const renderSectionLabel = (label: string) => (
    <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
      <Typography variant="overline" sx={{ fontWeight: 600, color: '#757575', fontSize: 10 }}>
        {label}
      </Typography>
    </Box>
  );

  const renderViewMore = (
    hidden: typeof channels,
    expanded: boolean,
    onToggle: () => void,
  ) => {
    if (hidden.length === 0) return null;
    return (
      <>
        <Collapse in={expanded}>
          <List dense sx={{ px: 0.5, pt: 0 }}>
            {hidden.map(renderChannelItem)}
          </List>
        </Collapse>
        <ListItemButton
          onClick={onToggle}
          sx={{
            borderRadius: 1,
            mx: 1,
            py: 0.25,
            minHeight: 30,
            '&:hover': { bgcolor: '#F3F4F6' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: '#2563EB' }}>
            {expanded ? <ExpandLess sx={{ fontSize: 16 }} /> : <ExpandMore sx={{ fontSize: 16 }} />}
          </ListItemIcon>
          <ListItemText
            primary={expanded ? 'Show less' : `View ${hidden.length} more...`}
            primaryTypographyProps={{
              fontSize: '0.8125rem',
              color: '#2563EB',
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      </>
    );
  };

  if (!leftNavOpen) {
    if (isMobile) return null;
    return (
      <Box
        sx={{
          width: 40,
          bgcolor: '#F9FAFB',
          borderRight: '1px solid #E5E7EB',
          height: 'calc(100vh - 56px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            minHeight: navHeaderHeight,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconButton size="small" onClick={toggleLeftNav} aria-label="Open navigation">
            <MenuIcon sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: '#F9FAFB',
        borderRight: '1px solid #E5E7EB',
        height: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          minHeight: navHeaderHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          px: 1,
          flexShrink: 0,
        }}
      >
        <IconButton size="small" onClick={toggleLeftNav} aria-label="Close navigation">
          <MenuIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      <Box sx={{ overflow: 'auto', flex: 1 }}>
        {/* Ask NEX */}
        {aiChannel && (
          <>
            {renderSectionLabel('Ask NEX')}
            <List dense sx={{ px: 0.5, pt: 0 }}>
              {renderChannelItem(aiChannel)}
            </List>
          </>
        )}

        {/* Announcements */}
        {announcementChannels.length > 0 && (
          <>
            {renderSectionLabel('Announcements')}
            <List dense sx={{ px: 0.5, pt: 0 }}>
              {announcementChannels.map(renderChannelItem)}
            </List>
          </>
        )}

        {/* Recognition */}
        {recognitionChannels.length > 0 && (
          <>
            {renderSectionLabel('Recognition')}
            <List dense sx={{ px: 0.5, pt: 0 }}>
              {recognitionChannels.map(renderChannelItem)}
            </List>
          </>
        )}

        {/* Chat Groups */}
        {(groupChannels.length > 0 || hiddenGroupChannels.length > 0) && (
          <>
            <Box sx={{ px: 2, pt: 1.5, pb: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="overline" sx={{ fontWeight: 600, color: '#757575', fontSize: 10 }}>
                Chat Groups
              </Typography>
              <IconButton size="small" sx={{ p: 0.25 }}>
                <Add sx={{ fontSize: 18, color: '#757575' }} />
              </IconButton>
            </Box>
            <List dense sx={{ px: 0.5, pt: 0 }}>
              {groupChannels.map(renderChannelItem)}
            </List>
            {renderViewMore(hiddenGroupChannels, showMoreGroups, toggleShowMoreGroups)}
          </>
        )}

        {/* Direct Messages */}
        {(dmChannels.length > 0 || hiddenDmChannels.length > 0) && (
          <>
            <Box sx={{ px: 2, pt: 1.5, pb: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="overline" sx={{ fontWeight: 600, color: '#757575', fontSize: 10 }}>
                Direct Messages
              </Typography>
              <IconButton size="small" sx={{ p: 0.25 }}>
                <Add sx={{ fontSize: 18, color: '#757575' }} />
              </IconButton>
            </Box>
            <List dense sx={{ px: 0.5, pt: 0 }}>
              {dmChannels.map(renderChannelItem)}
            </List>
            {renderViewMore(hiddenDmChannels, showMoreDMs, toggleShowMoreDMs)}
          </>
        )}

        <Divider sx={{ my: 1.5, mx: 2 }} />

        {/* Netchex Section */}
        <Box sx={{ px: 2, pb: 0.5 }}>
          <Typography variant="overline" sx={{ fontWeight: 600, color: '#757575' }}>
            Netchex
          </Typography>
        </Box>

        <List dense sx={{ px: 0.5 }}>
          {netchexItems.map((item) => (
            <ListItemButton
              key={item.id}
              selected={activeNetchexPage === item.id}
              onClick={() => handleNetchexClick(item.id)}
              sx={{
                borderRadius: 1,
                mx: 0.5,
                py: 0.4,
                minHeight: 34,
                bgcolor: activeNetchexPage === item.id ? '#EFF6FF' : 'transparent',
                '&:hover': { bgcolor: activeNetchexPage === item.id ? '#EFF6FF' : '#F3F4F6' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: activeNetchexPage === item.id ? '#2563EB' : '#6B7280' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: activeNetchexPage === item.id ? 600 : 400,
                  color: activeNetchexPage === item.id ? '#2563EB' : '#333',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}
