'use client';

import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box, Button, Chip, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function SloveProblemPage({
  params,
}: {
  params: { id: string };
}) {
  const [language, setLanguage] = useState('javascript');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <Grid container>
      <Grid xs={12} md={6}>
        <Box sx={{ margin: '10px' }}>
          <Typography variant='h6'>1. Two Sum</Typography>
          <Chip label='Easy' color='primary' variant='outlined' size='small' />
          <Typography variant='body1'>
            Given an array of integers <b>nums</b> and an integer <b>target</b>,
            return indices of the two numbers such that they add up to target.
            <br></br>
            <br></br>
            You may assume that each input would have{' '}
            <b>exactly one solution</b>, and you may not use the same element
            twice.
            <br></br>
            <br></br>
            You can return the answer in any order.
          </Typography>
          <br></br>
          <Typography variant='body1' sx={{ marginBottom: '15px' }}>
            <b>Example 1:</b>
            <br></br>
            <Box
              sx={{
                borderLeft: '1px solid #c0c0c0',
                marginLeft: '10px',
                paddingLeft: '20px',
                borderWidth: '3px',
              }}
            >
              <b>Input:</b> nums = [2,7,11,15], target = 9<br></br>
              <b>Output:</b> [0,1]
              <br></br>
              <b>Explanation:</b>
              Because nums[0] + nums[1] == 9, we return [0, 1].
            </Box>
          </Typography>
          <Typography variant='body1' sx={{ marginBottom: '15px' }}>
            <b>Example 2:</b>
            <br></br>
            <Box
              sx={{
                borderLeft: '1px solid #c0c0c0',
                marginLeft: '10px',
                paddingLeft: '20px',
                borderWidth: '3px',
              }}
            >
              <b>Input:</b> nums = [3,2,4], target = 6<br></br>
              <b>Output:</b> [1,2]
              <br></br>
              <b>Explanation:</b>
              Because nums[0] + nums[1] == 9, we return [0, 1].
            </Box>
          </Typography>
          <Typography variant='body1' sx={{ marginBottom: '15px' }}>
            <b>Example 3:</b>
            <br></br>
            <Box
              sx={{
                borderLeft: '1px solid #c0c0c0',
                marginLeft: '10px',
                paddingLeft: '20px',
                borderWidth: '3px',
              }}
            >
              <b>Input:</b> nums = [3,3], target = 6<br></br>
              <b>Output:</b> [0,1]
              <br></br>
              <b>Explanation:</b>
              Because nums[0] + nums[1] == 9, we return [0, 1].
            </Box>
          </Typography>
        </Box>
      </Grid>

      <Grid xs={12} md={6}>
        <Container sx={{ padding: '24px' }}>
          <FormControl
            sx={{
              m: 1,
              minWidth: 120,
              width: '-webkit-fill-available',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            size='small'
          >
            <Select
              id='code-language-select'
              value={language}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={'javascript'}>Javascript</MenuItem>
              <MenuItem value={'html'}>HTML</MenuItem>
              <MenuItem value={'css'}>CSS</MenuItem>
              <MenuItem value={'typescript'}>Typescript</MenuItem>
              <MenuItem value={'java'}>Java</MenuItem>
              <MenuItem value={'python'}>Python</MenuItem>
              <MenuItem value={'sql'}>SQL</MenuItem>
            </Select>

            <div>
              <Button
                sx={{ marginRight: '10px' }}
                variant='outlined'
                startIcon={<PlayArrowIcon />}
              >
                Run
              </Button>
              <Button startIcon={<CloudUploadIcon />} variant='contained'>
                Submit
              </Button>
            </div>
          </FormControl>
          <Editor
            height='70vh'
            width='-webkit-fill-available'
            theme='vs-dark'
            defaultLanguage={language}
            defaultValue='// start sloving the problem'
            language={language}
            options={{
              fontSize: 16,
              padding: {
                top: 16,
              },
            }}
          />
        </Container>
      </Grid>
    </Grid>
  );
}
