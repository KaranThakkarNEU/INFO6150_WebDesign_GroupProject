import React, { useState } from 'react';
import {
  Modal,
  Button,
  Typography,
  Box,
  TextField,
  TextareaAutosize,
} from '@mui/material';

const NewGroupModal = (props: any) => {
  const {
    open,
    close,
    newGroup,
    myGroups,
    allGroups,
    updateStates,
    currentUser,
  } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();

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

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  // const onImageChange = (e: any) => {
  //   console.log(e.target.files[0]);
  //   setImage(e.target.files[0]);
  // };

  // const formData = new FormData();

  // if (image) {
  //   formData.append('groupLogo', image);
  // }
  // const uploadImage = async () => {
  //   const formData = new FormData();
  //   if (image) {
  //     formData.append('groupLogo', image);
  //   }
  //   const result = await axios.post(
  //     'http://localhost:4000/uploadImage',
  //     formData,
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }
  //   );
  // };

  const handleButtonClick = () => {
    newGroup(title, description, currentUser);
    close();
  };
  return (
    <Modal open={open} onClose={close}>
      <Box
        sx={{
          ...modalStyle,
          margin: '20px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant='h6'
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '0',
          }}
        >
          Create a New Group
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              margin: '30px 15px 0 15px',
            }}
          >
            <Typography variant='subtitle1'>Group Name:</Typography>
            <TextField variant='outlined' onChange={onTitleChange} fullWidth />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              margin: '20px 15px 0 15px',
            }}
          >
            <Typography variant='subtitle1'>Group Description:</Typography>
            <TextareaAutosize
              aria-label='Group Description'
              onChange={onDescriptionChange}
              minRows={3}
              maxRows={6}
              style={{ height: '90px', width: '100%', resize: 'vertical' }}
            />
          </Box>

          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              margin: '20px 15px 0 15px',
            }}
          >
            <Typography variant='subtitle1'>Group Logo:</Typography>
            <input type='file' accept='image/*' />
          </Box> */}
        </Box>
        <Button
          variant='contained'
          onClick={handleButtonClick}
          style={{ marginTop: '40px', marginBottom: '20px' }}
        >
          Create Group
        </Button>
      </Box>
    </Modal>
  );
};

export default NewGroupModal;
