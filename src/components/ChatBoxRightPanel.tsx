import React, { useState } from 'react';
import { Box, TextField, IconButton, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBoxMessages from './ChatBoxMessages';
import ChatBoxSendMessage from './ChatBoxSendMessage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { db } from '../../firebase/clientApp';

const ChatboxRightPanel = (props: any) => {
  const { groupId, currentUser } = props;
  const [messages, setMessages] = useState();

  let isSendingMessage = false;
  const sendMessage = async (groupId: string, text: string, sender: string) => {
    const message = {
      text: text,
      sender: sender,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Current timestamp
    };

    if (!isSendingMessage) {
      isSendingMessage = true;

      const groupRef = db.collection('groups').doc(groupId);
      await groupRef.collection('messages').add(message);
      console.log('Message sent!');
      isSendingMessage = false;
    } else {
      console.log('Message is already being sent.');
    }
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='flex-start'
      alignItems='stretch'
      sx={{
        width: '100%',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <Grid item>
        <ChatBoxMessages
          groupId={groupId}
          messages={messages}
          currentUser={currentUser}
        />
      </Grid>
      <Grid item>
        <ChatBoxSendMessage
          sendMessage={sendMessage}
          currentUser={currentUser}
          groupId={groupId}
        />
      </Grid>
    </Grid>
  );
};

export default ChatboxRightPanel;
