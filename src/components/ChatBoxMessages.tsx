import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/clientApp';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {
  Container,
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { AppDataProvider, useAppData } from '@/contexts/AppDataProvider';
import { useTheme } from '@mui/material/styles';

const ChatBoxMessages = (props: any) => {
  const { groupId, messages, currentUser, scroll } = props;
  const [updatedGroupId, setUpdatedGroupId] = useState(groupId);
  const theme = useTheme();
  // const { groupId } = useAppData();
  const [message, setMessage] = useState([]);
  const getMessages = async (groupId: string) => {
    while (!updatedGroupId) {
      // If groupId is empty or undefined, wait for a short time before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    }

    const messagesSnapshot = await db
      .collection('groups')
      .doc(groupId)
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot((snapshot: any) => {
        setMessage(snapshot.docs.map((doc: any) => doc.data()));
        console.log(snapshot.docs.map((doc: any) => doc.data()));
      });
  };

  useEffect(() => {
    getMessages(updatedGroupId);
  }, [updatedGroupId]);

  useEffect(() => {
    setUpdatedGroupId(groupId);
  });
  return (
    <AppDataProvider>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '8px',
          // justifyContent: 'flex-end',
          // flexWrap: 'wrap',
          width: '100%',
          height: 'calc(100vh - 158.5px)',
          overflowY: 'scroll',
        }}
      >
        {message.map(({ id, text, createdAt, sender }) => {
          const createdAtTimestamp = createdAt?.['seconds'] * 1000; // Convert seconds to milliseconds
          const createdAtDate = new Date(createdAtTimestamp);

          return (
            <Card
              key={id}
              sx={{
                marginBottom: '8px',
                width: 'fit-content',
                height: sender === currentUser.displayName ? '40px' : '80px',
                maxWidth: '50%',
                minWidth: '200px',
                flex: '0 0 auto',
                backgroundColor:
                  sender === currentUser.displayName ? '#1876d2' : '#ecf4fd',
                alignSelf:
                  sender === currentUser.displayName
                    ? 'flex-end'
                    : 'flex-start',
                justifySelf:
                  sender === currentUser.displayName
                    ? 'flex-end'
                    : 'flex-start',
                position: 'relative',
              }}
            >
              {sender !== currentUser.displayName ? (
                <Typography
                  variant='body2'
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    fontSize: '12px',
                    color: 'black',
                  }}
                >
                  <strong>{sender}</strong>
                </Typography>
              ) : null}
              <Typography
                variant='body2'
                sx={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '3px',
                  fontSize: '12px',
                  color: sender === currentUser.displayName ? 'white' : 'black',
                }}
              >
                {`${createdAtDate.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}`}
              </Typography>
              <CardContent
                sx={{
                  maxWidth: '100%',
                  width: 'fit-content',
                  display: 'flex',
                }}
              >
                <Typography
                  variant='body1'
                  sx={{
                    color:
                      sender === currentUser.displayName ? 'white' : 'black',
                  }}
                >
                  {text}
                </Typography>
                <div ref={scroll}></div>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </AppDataProvider>
    // <AppDataProvider>
    //   <Container
    //     sx={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       marginTop: '8px',
    //       width: '100%',
    //       height: 'calc(100vh - 158.5px)',
    //       overflowY: 'scroll',
    //       [theme.breakpoints.up('sm')]: {
    //         flexDirection: 'row',
    //         flexWrap: 'wrap',
    //         justifyContent: 'flex-end',
    //       },
    //     }}
    //   >
    //     {message.map(({ id, text, createdAt, sender }) => {
    //       // ...existing code...

    //       return (
    //         <Card
    //           key={id}
    //           sx={{
    //             marginBottom: '8px',
    //             width: 'fit-content',
    //             height: sender === currentUser.displayName ? '40px' : '80px',
    //             maxWidth: '50%',
    //             minWidth: '200px',
    //             flex: '0 0 auto',
    //             backgroundColor:
    //               sender === currentUser.displayName ? '#1876d2' : '#ecf4fd',
    //             alignSelf:
    //               sender === currentUser.displayName
    //                 ? 'flex-end'
    //                 : 'flex-start',
    //             justifySelf:
    //               sender === currentUser.displayName
    //                 ? 'flex-end'
    //                 : 'flex-start',
    //             position: 'relative',
    //             [theme.breakpoints.up('sm')]: {
    //               width: 'auto',
    //               height: 'fit-content',
    //               maxWidth: '100%',
    //               marginBottom: '16px',
    //             },
    //           }}
    //         >
    //           {/* ...existing code... */}
    //         </Card>
    //       );
    //     })}
    //   </Container>
    // </AppDataProvider>
  );
};

export default ChatBoxMessages;
