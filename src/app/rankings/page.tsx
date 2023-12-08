'use client';

import axiosInstance from '@/utility/axios';
import { IRankingsModel } from '@/utility/models/IRankings';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  tableCellClasses,
  Skeleton,
  Box,
} from '@mui/material';
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

export default function RankingsPage() {
  const [rankingsData, setRankingsData] = useState<IRankingsModel[]>([]);

  useEffect(() => {
    const fetchRankings = async () => {
      const res = await axiosInstance.get('/rankings');
      setRankingsData(res.data.rankings);
    };
    fetchRankings();
  }, []);

  return (
    <>
      {rankingsData.length === 0 ? (
        <Box sx={{ width: '100vw', marginTop: '45px' }}>
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
          <Skeleton animation='wave' />
        </Box>
      ) : (
        <TableContainer
          component='div'
          sx={{
            padding: '20px',
            boxShadow: '1px 9px 17px -3px rgba(0,0,0,0.7)',
          }}
        >
          <Table
            sx={{ minWidth: 700, borderRadius: '20px', overflow: 'hidden' }}
            aria-label='customized table'
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align='right'>
                  Total Solved Problems
                </StyledTableCell>
                <StyledTableCell align='right'>Country</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rankingsData.map((row) => (
                <StyledTableRow key={row.userId}>
                  <StyledTableCell component='th' scope='row'>
                    {row.userName}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {row.totalSolvedProblems}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{row.country}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
