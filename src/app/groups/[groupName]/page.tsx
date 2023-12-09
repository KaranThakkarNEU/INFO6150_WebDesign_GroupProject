'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { useRouter as useNavigator } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Avatar, List, ListItem, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { AppDataProvider, useAppData } from '@/contexts/AppDataProvider';
import ChatboxLeftPanel from '@/components/ChatBoxLeftPanel';
import ChatboxRightPanel from '@/components/ChatBoxRightPanel';
import ChatBoxTeamMembersSearch from '@/components/ChatBoxTeamMembersSearch';
import { useAuth } from '@/utility/context/auth';

const GroupChatboxPage = () => {
  const url = require('url');
  const {
    groups,
    fetchGroups,
    myGroups,
    otherGroups,
    addNewGroup,
    myGroupsMap,
    otherGroupsMap,
    addParticipant,
    groupId,
    updateGroupId,
    currentUser,
    refreshGroups,
    contextVersion,
  } = useAppData();
  const { user } = useAuth();
  const scroll = useRef<HTMLDivElement | null>(null);
  // const [scrollEvent, setScrollEvent] = useState();
  const teamMembersArray = (groupId: String) => {
    return myGroupsMap?.get(groupId);
  };

  useEffect(() => {
    fetchGroups();
    scrollEvent();
  }, []);

  const scrollEvent = () => {
    scroll?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    refreshGroups();
    scrollEvent();
  }, [groups]);

  useEffect(() => {
    const parsedUrl = url.parse(window.location.href);
    const groupId = parsedUrl.pathname.split('/').pop();
    updateGroupId(groupId);
  }, [url]);

  const updatedTeamMembers = groupId
    ? teamMembersArray(groupId)?.map((member: any) => {
        const firstName = member.username?.split(' ')[0];
        const lastName = member.username?.split(' ')[1];
        const displayName = lastName
          ? `${firstName?.charAt(0)}${lastName?.charAt(0)}`
          : `${firstName?.charAt(0)}`;
        return { ...member, displayName };
      })
    : [];
  console.log(updatedTeamMembers);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  });
  interface TeamMember {
    name: string;
    userId: string;
  }
  //   const navigator = useNavigator();
  //   const router = useRouter();
  //   const { groupName, ...otherProps } = router.query;

  const teamData: TeamMember[] = [
    { name: 'John Doe', userId: '123' },
    { name: 'Jane Smith', userId: '456' },
    { name: 'Mike Johnson', userId: '789' },
    { name: 'Sarah Williams', userId: '012' },
    { name: 'David Brown', userId: '345' },
  ];

  return (
    <AppDataProvider>
      <Grid container>
        <Grid item xs={3}>
          <Paper>
            <ChatBoxTeamMembersSearch teamData={updatedTeamMembers} />
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <Paper>
            {/* <div style={{ maxHeight: '400px', overflowY: 'scroll' }}> */}
            {/* {messages.map((message) => (
              <div key={message.id}>
                <p>{`${message.sender}: ${message.text}`}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Type a message...'
              margin='dense'
            />
            <button>Send</button> */}
            {/* This button can be a Material-UI button */}
            <ChatboxRightPanel
              groupId={groupId}
              currentUser={currentUser}
              scroll={scroll}
              scrollEvent={scrollEvent}
            />
            {/* </div> */}
          </Paper>
        </Grid>
      </Grid>
    </AppDataProvider>
  );
};

export default GroupChatboxPage;
