import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { AppDataProvider, useAppData } from '@/contexts/AppDataProvider';

const ChatBoxSendMessage = (props: any) => {
  const { sendMessage, currentUser, groupId } = props;
  // const { messages, setMessages } = useAppData();
  const [text, setText] = useState('');
  const onInputChange = (e: any) => {
    setText(e.target.value);
  };
  const onSend = () => {
    sendMessage(groupId, text, currentUser.displayName);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        background: 'linear-gradient(45deg, #438fff, black)',
        height: '90px',
        marginBottom: '8px',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#fff',
          borderRadius: '30px',
          padding: '0 10px',
          width: '75%',
          marginRight: '20px',
          marginLeft: '20px',
          border: '1px solid #606060',
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={2}
          id='search-bar'
          className='text'
          onChange={onInputChange}
          placeholder='Send Message...'
          size='small'
          sx={{
            width: '100%',
            maxWidth: '800px',
            '@media (max-width: 768px)': {
              maxWidth: 'calc(100% - 100px)',
            },
          }}
          InputProps={{
            disableUnderline: true,
            sx: {
              borderRadius: '0px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '0px',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderWidth: '0px',
              },
              '&:focus-within .MuiOutlinedInput-notchedOutline': {
                borderWidth: '0px',
              },
            },
          }}
        />
        <IconButton type='submit' aria-label='search'>
          <SendIcon sx={{ fill: '#1876d2' }} onClick={onSend} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBoxSendMessage;
