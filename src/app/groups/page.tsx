'use client';
import { AppDataProvider, useAppData } from '@/contexts/AppDataProvider';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GroupCard from '../../components/GroupCard';
import GroupChatboxPage from './[groupName]/page';
import { Button, Typography, Grid, Box, Paper } from '@mui/material';
import { set, update } from 'firebase/database';
import NewGroupModal from '@/components/NewGroupModal';

import { useRouter as useNavigator } from 'next/navigation';

import { useRouter } from 'next/dist/client/router';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from '../../../firebase/clientApp';
import { useAuth } from '@/utility/context/auth';

const GroupsPage = () => {
  const {
    groups,
    fetchGroups,
    myGroups,
    otherGroups,
    addNewGroup,
    myGroupsMap,
    otherGroupsMap,
    addParticipant,
    updateGroupId,
    contextVersion,
    refreshGroups,
  } = useAppData();
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    fetchGroups();
  }, [contextVersion]);

  const navigator = useNavigator();

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the color and opacity
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
  };

  const navigateToChatboxPage = (groupId: String) => {
    navigator.push(`/groups/${groupId.toLowerCase()}`);
    console.log(`Navigating to chatbox for group: ${groupId}`);
  };
  // useEffect(() => {}, [myGroups, otherGroups]);

  const [openNewGroupModal, setOpenNewGroupModal] = useState(false);

  const openModal = () => {
    setOpenNewGroupModal(true);
  };

  const closeModal = () => {
    setOpenNewGroupModal(false);
  };

  return (
    <AppDataProvider>
      {groups?.length === 0 ? (
        <Box sx={styles.overlay}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <CircularProgress />
          </Paper>
        </Box>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '30px',
            }}
          >
            <Button variant='contained' onClick={openModal}>
              Create New Group
            </Button>
          </div>
          <NewGroupModal
            open={openNewGroupModal}
            close={closeModal}
            newGroup={addNewGroup}
            myGroups={myGroups}
            otherGroups={otherGroups}
            currentUser={currentUser}
          />
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Typography
                sx={{ padding: '30px', marginLeft: '5px' }}
                variant='h5'
              >
                My Groups
                <hr style={{ borderTop: '1px solid #ccc', margin: '10px 0' }} />
              </Typography>
              <Grid container spacing={2}>
                {myGroups.length === 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        padding: '30px',
                        marginLeft: '5px',
                      }}
                    >
                      You haven't joined any group.
                    </Typography>
                  </div>
                ) : (
                  myGroups.map((group: any) => {
                    return (
                      <GroupCard
                        groupId={group._id}
                        title={group.groupName}
                        description={group.groupDescription}
                        groupType={group.groupType}
                        myGroups={myGroups}
                        updateGroupId={updateGroupId}
                        navigateToChatboxPage={navigateToChatboxPage}
                      />
                    );
                  })
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                sx={{ padding: '30px', marginLeft: '5px' }}
                variant='h5'
              >
                Groups You Can Join
                <hr style={{ borderTop: '1px solid #ccc', margin: '10px 0' }} />
              </Typography>
              <Grid container spacing={2}>
                {otherGroups.map((group: any) => {
                  return (
                    <GroupCard
                      groupId={group._id}
                      title={group.groupName}
                      description={group.groupDescription}
                      groupType={group.groupType}
                      myGroups={myGroups}
                      otherGroups={otherGroups}
                      otherGroupsMap={otherGroupsMap}
                      addParticipant={addParticipant}
                      currentUserName={currentUser?.displayName}
                      currentUserId={currentUser?.uid}
                    />
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </AppDataProvider>
  );
};

export default GroupsPage;
