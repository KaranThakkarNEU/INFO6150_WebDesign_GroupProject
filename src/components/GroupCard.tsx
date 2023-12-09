import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import { Typography, CardActionArea } from '@mui/material';
import Modal from './GroupCardDetailsModal';

const GroupCard = (props: any) => {
  const {
    groupId,
    title,
    description,
    groupType,
    teamMembers,
    myGroups,
    allGroups,
    updateStates,
    navigateToChatboxPage,
    otherGroupsMap,
    addParticipant,
    currentUserName,
    currentUserId,
    updateGroupId,
  } = props;

  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const handleCardClick = () => {
    if (groupType !== 'otherGroup') {
      updateGroupId(groupId);
      // navigateToChatboxPage(title);
      navigateToChatboxPage(groupId);
    } else {
      setOpenDetailsModal(true);
      console.log('open modal');
    }
  };
  const closeModal = () => {
    setOpenDetailsModal(false);
  };

  return (
    <Card
      sx={{
        width: 345,
        // maxWidth: 345,
        padding: '30px',
        margin: '50px',
        // maxHeight: '450px',
        height: '450px',
      }}
    >
      <CardActionArea
        sx={{ maxHeight: '400px', minHeight: '400px' }}
        onClick={handleCardClick}
      >
        {/* <CardMedia component='img' height='140' image='' alt='green iguana' /> */}
        <CardContent component='div'>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        {button === 'Open' ? (
          <Button sx={{ display: 'none' }} size='large' color='primary'>
            {button}
          </Button>
        ) : (
          <Button size='large' color='primary'>
            {button}
          </Button>
        )}
      </CardActions> */}
      {groupType === 'otherGroup' ? (
        <Modal
          open={openDetailsModal}
          close={closeModal}
          title={title}
          description={description}
          teamMembers={teamMembers}
          myGroups={myGroups}
          allGroups={allGroups}
          updateStates={updateStates}
          otherGroupsMap={otherGroupsMap}
          addParticipant={addParticipant}
          groupId={groupId}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
        />
      ) : null}
    </Card>
  );
};

export default GroupCard;
