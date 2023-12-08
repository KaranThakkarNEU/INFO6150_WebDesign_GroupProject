'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Editor, Monaco } from '@monaco-editor/react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box, Button, Chip, Skeleton, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import axiosInstance from '@/utility/axios';
import { IProblemsModel } from '@/utility/models/IProblems';
import axios from 'axios';
import { auth } from '../../../../firebase/clientApp';
import { ErrorProps } from '@/utility/models/error';
import ErrorComponent from '@/components/error';

export default function SloveProblemPage({
  params,
}: {
  params: { id: string };
}) {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [compileStatus, setCompileStatus] = useState<{
    status: string;
    memory: number;
    time: number;
  }>({
    status: '',
    memory: 0,
    time: 0,
  });
  const [compliedCode, setCompliedCode] = useState('');
  const [isCompiled, setIsCompiled] = useState(false);
  const [isCodeSubmit, setIsCodeSubmit] = useState(false);
  const [problemData, setProblemData] = useState<IProblemsModel>();
  const [alertMsg, setAlertMsg] = useState<ErrorProps>({
    isActive: false,
    message: '',
    type: 'success',
  });
  const editorRef = useRef(null);

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (event: any) => {
    setCode(event);
  };

  const handleCodeCompile = async () => {
    const formData = new FormData();
    formData.append(
      'source_code',
      code.length ? btoa(code) : btoa('console.log("hello world")')
    );
    formData.append('language_id', '63');

    const config = {
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_RAPIDAPI_URL}/submissions`,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      },
      data: formData,
    };

    try {
      setIsCompiled(true);
      let response = await axios.request(config);
      let token = response.data.token;
      checkCompileStatus(token);
    } catch (error) {
      setIsCompiled(false);
      console.log(error);
    }
  };

  const checkCompileStatus = async (token: string) => {
    const config = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_RAPIDAPI_URL}/submissions/${token}`,
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST,
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
      },
    };

    try {
      let response = await axios.request(config);
      let statusId = response.data?.status?.id;

      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkCompileStatus(token);
        }, 2000);
      } else {
        // done
        setCompileStatus({
          status: response.data?.status?.description,
          memory: response.data.memory,
          time: response.data.time,
        });
        setCompliedCode(response.data?.stdout);
        setIsCompiled(false);
      }
    } catch (error) {
      setIsCompiled(false);
      console.log(error);
    }
  };

  const handleCodeSubmit = async () => {
    try {
      setIsCodeSubmit(true);
      // get user id and username firebase
      const userId = auth.currentUser?.uid;
      const username = auth.currentUser?.displayName;

      const res = await axiosInstance.put('/rankings/update', {
        userId: userId,
        username: username,
      });
      setAlertMsg({
        isActive: true,
        message: 'Ranking updated successfully',
        type: 'success',
      });
      setIsCodeSubmit(false);
    } catch (error) {
      setIsCodeSubmit(false);
      console.log(error);
    }
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    if (checkRoomExists(params.id)) {
      console.log('object');
      return;
    } else {
      console.log('sdsds');
      createNewRoom(params.id, editor);
    }
  };

  const checkRoomExists = (roomName: string) => {
    const doc = new Y.Doc();
    const provider = new WebrtcProvider(roomName, doc);
    console.log(provider.awareness.getStates().size);

    // Check if there are any connected clients in the room
    return provider.awareness.getStates().size > 0;
  };

  const createNewRoom = async (roomName: string, editor: any) => {
    // initialize yjs
    const doc = new Y.Doc(); // a collection of shared objects

    // connect to peers (or start connection) with webRTC
    const provider = new WebrtcProvider(params.id, doc);
    const type = doc.getText('monaco');

    // Bind yjs to monaco editor
    const binding = new MonacoBinding(
      type,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );
  };

  const handleCollab = () => {
    // copy url to clipboard
    navigator.clipboard.writeText(window.location.href);
    setAlertMsg({
      isActive: true,
      message:
        'Link copied to clipboard, share it with your friends and collab.',
      type: 'success',
    });
  };

  useEffect(() => {
    // fetch problem data
    const fetchData = async () => {
      const res = await axiosInstance.get(
        `/problems/getProblemById?id=${params.id}`
      );
      setProblemData(res.data.problem);
    };
    fetchData();
  }, []);

  return (
    <>
      {alertMsg.isActive ? (
        <ErrorComponent message={alertMsg.message} type={alertMsg.type} />
      ) : null}
      <Grid container>
        <Grid xs={12} md={6}>
          <Box sx={{ margin: '10px' }}>
            {problemData ? (
              <>
                <Grid container>
                  <Grid xs={6}>
                    <Typography variant='h6'>{problemData?.title}</Typography>
                  </Grid>
                  <Grid xs={6} sx={{ textAlign: 'end' }}>
                    <Button variant='contained' onClick={handleCollab}>
                      Collab
                    </Button>
                  </Grid>
                </Grid>
                <Chip
                  label={problemData?.difficulty}
                  color='primary'
                  variant='outlined'
                  size='small'
                />
              </>
            ) : (
              <Skeleton animation='wave' />
            )}
            <Typography variant='body1'>
              Given an array of integers <b>nums</b> and an integer{' '}
              <b>target</b>, return indices of the two numbers such that they
              add up to target.
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
                {isCompiled ? (
                  <LoadingButton
                    sx={{ marginRight: '10px' }}
                    loading
                    startIcon={<PlayArrowIcon />}
                    loadingPosition='start'
                    variant='outlined'
                  >
                    Run
                  </LoadingButton>
                ) : (
                  <Button
                    sx={{ marginRight: '10px' }}
                    variant='outlined'
                    startIcon={<PlayArrowIcon />}
                    onClick={handleCodeCompile}
                  >
                    Run
                  </Button>
                )}

                {isCodeSubmit ? (
                  <LoadingButton
                    loading
                    startIcon={<CloudUploadIcon />}
                    variant='contained'
                    color='success'
                    loadingPosition='start'
                  >
                    Submit
                  </LoadingButton>
                ) : (
                  <Button
                    startIcon={<CloudUploadIcon />}
                    variant='contained'
                    color='success'
                    onClick={handleCodeSubmit}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </FormControl>
            <Editor
              height='70vh'
              width='-webkit-fill-available'
              theme='vs-dark'
              defaultLanguage={language}
              onChange={handleCodeChange}
              defaultValue='// start sloving problem'
              onMount={handleEditorDidMount}
              language={language}
              options={{
                fontSize: 16,
                padding: {
                  top: 16,
                },
              }}
            />
            {/* create code output screen */}
            <br></br>
            <Typography variant='h6'>Output</Typography>
            <Box
              sx={{
                width: '-webkit-fill-available',
                height: '200px',
                backgroundColor: '#1e1e1e',
                marginTop: '10px',
                borderRadius: '5px',
                padding: '10px',
              }}
            >
              <Typography variant='body1' sx={{ color: 'white' }}>
                {compliedCode}
              </Typography>
            </Box>
            {/* create 3 labels which shows status, memory, time */}
            <br></br>
            <Typography variant='h6'>
              Status: <Chip label={compileStatus?.status} />
            </Typography>
            <Typography variant='h6'>
              Memory: <Chip label={compileStatus?.memory} />
            </Typography>
            <Typography variant='h6'>
              Time: <Chip label={compileStatus?.time} />
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
