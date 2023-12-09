import React, { useState } from 'react';
import {
  Modal,
  Button,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Avatar,
} from '@mui/material';
import { update } from 'firebase/database';
import { string } from 'yup';

const GroupCardDetailsModal = (props: any) => {
  const {
    title,
    description,
    open,
    close,
    teamMembers,
    myGroups,
    allGroups,
    updateStates,
    otherGroupsMap,
    addParticipant,
    groupId,
    currentUserName,
    currentUserId,
  } = props;

  const [joined, setJoined] = useState(false);

  const teamMembersArray = (groupId: String) => {
    return otherGroupsMap.get(groupId);
  };

  const updatedTeamMembers = teamMembersArray(groupId)?.map((member: any) => {
    const firstName = member.username?.split(' ')[0];
    const lastName = member.username?.split(' ')[1];
    const displayName = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
    return { ...member, displayName };
  });

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onJoin = () => {
    addParticipant(groupId, currentUserId, currentUserName);
    setJoined(true);
  };

  return (
    !joined && (
      <Modal
        open={open}
        onClose={close}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ ...modalStyle, margin: '20px', padding: '20px' }}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {title}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: '10px',
              paddingTop: '10px',
            }}
          >
            {updatedTeamMembers?.map(
              (member: { username: string; displayName: string }) => {
                return (
                  <Tooltip title={member.username}>
                    <Avatar sx={{ marginRight: '10px' }}>
                      {member.displayName}
                    </Avatar>
                  </Tooltip>
                );
              }
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '10px',
              paddingTop: '10px',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              sx={{ width: '-webkit-fill-available' }}
              onClick={onJoin}
            >
              Join
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  );
};

export default GroupCardDetailsModal;
