'use client';

import axiosInstance from '@/utility/axios';
import { useAuth } from '@/utility/context/auth';
import { IGroupsModel } from '@/utility/models/IGroupsModel';
import {
  Box,
  Skeleton,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  styled,
  tableCellClasses,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [groupsData, setGroupsData] = useState<IGroupsModel[]>([]);

  useEffect(() => {
    if (!user?.emailVerified) {
      router.push('/groups');
      return;
    } else {
      const fetchGroupsData = async () => {
        try {
          const res = await axiosInstance.get('/groups');
          setGroupsData(res.data.groups);
        } catch (error) {
          console.log(error);
        }
      };

      fetchGroupsData();
    }
  }, [user]);

  return (
    <>
      {user?.emailVerified ? (
        <>
          {groupsData.length === 0 ? (
            <Box sx={{ width: '100vw', marginTop: '45px' }}>
              <Skeleton animation='wave' />
              <Skeleton animation='wave' />
              <Skeleton animation='wave' />
            </Box>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer
                sx={{
                  padding: '20px',
                  boxShadow: '1px 9px 17px -3px rgba(0,0,0,0.7)',
                }}
              >
                <Table
                  stickyHeader
                  sx={{
                    minWidth: 700,
                    borderRadius: '20px',
                    overflow: 'hidden',
                  }}
                  aria-label='customized table'
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Group Name</StyledTableCell>
                      <StyledTableCell align='center'>
                        Group Description
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        Total Participants
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {groupsData.map((row) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component='th' scope='row'>
                          {row.groupName}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {' '}
                          {row.groupDescription}
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          {' '}
                          {row.participants.length}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
