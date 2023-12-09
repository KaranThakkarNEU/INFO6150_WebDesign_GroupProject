import { Avatar, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import TeamMembersSearch from './ChatBoxTeamMembersSearch';

const ChatboxLeftPanel = (props: any) => {
  const { teamData } = props;

  return (
    <div style={{ overflow: 'hidden' }}>
      <TeamMembersSearch teamData={teamData} />
    </div>
  );
};

export default ChatboxLeftPanel;
