import React from 'react';
import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';

const TeamMembersSearch = (props: any) => {
  const { teamData } = props;
  const onInputChange = (e: any) => {
    console.log(e.target.value);
  };
  const searchFieldBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '0 10px',
    zIndex: -1,
  };
  const teamBoxStyle = {
    // flex: 1,
    overflow: 'auto',
    padding: '20px',
    borderRight: '1px solid #ccc',
    height: '100vh',
    background: 'linear-gradient(45deg, #438fff, black)',
    // minHeight: 'calc(100vh - 60px)',
    // width: '350px',
    // backgroundColor: 'black',
  };

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

  return (
    <>
      {teamData?.length === 0 ? (
        <Box sx={styles.overlay}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <CircularProgress />
          </Paper>
        </Box>
      ) : (
        <Box sx={teamBoxStyle}>
          {/* <Box sx={searchFieldBoxStyle}>
            <TextField
              id='search-bar'
              className='text'
              onChange={onInputChange}
              fullWidth
              placeholder='Search...'
              size='small'
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
              <SearchIcon sx={{ fill: '#1876d2' }} />
            </IconButton>
          </Box> */}

          <Box sx={{ marginTop: '40px' }}>
            {teamData?.map((member: any) => (
              <Box
                key={member.id}
                sx={{
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '5px',
                  padding: '0 10px',
                  marginBottom: '10px',
                }}
              >
                <Avatar sx={{ marginRight: '30px' }}>
                  {member.displayName}
                </Avatar>
                <Box sx={{ width: '100%' }}>
                  <Typography
                    gutterBottom
                    component='div'
                    variant='h6'
                    sx={{ color: 'white' }}
                  >
                    {member.username}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default TeamMembersSearch;
