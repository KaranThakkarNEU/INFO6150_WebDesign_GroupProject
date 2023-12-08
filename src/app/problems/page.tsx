'use client';

import ErrorComponent from '@/components/error';
import axiosInstance from '@/utility/axios';
import { IProblemsModel } from '@/utility/models/IProblems';
import { ErrorProps } from '@/utility/models/error';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  tableCellClasses,
  Chip,
  Button,
  Box,
  Skeleton,
  Paper,
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

export default function ProblemsPage() {
  const router = useRouter();
  const [problemsData, setProblemsData] = useState<IProblemsModel[]>([]);
  const [alertMsg, setAlertMsg] = useState<ErrorProps>({
    isActive: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/problems');
        setProblemsData(res.data.problems);
        setAlertMsg({
          isActive: true,
          message: 'Problems fetched successfully',
          type: 'success',
        });
      } catch (error) {
        setAlertMsg({
          isActive: true,
          message: 'Failed to fetch problems',
          type: 'error',
        });
      }
      clearAlertMsg();
    };
    fetchData();
  }, []);

  const clearAlertMsg = () => {
    setTimeout(() => {
      setAlertMsg({
        isActive: false,
        message: '',
        type: 'success',
      });
    }, 3000);
  };

  const handleProblemSolve = (id: string) => {
    router.push(`/problems/${id}`);
  };

  const getChipColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'success';
    }
  };

  return (
    <>
      {alertMsg.isActive ? (
        <ErrorComponent message={alertMsg.message} type={alertMsg.type} />
      ) : null}
      {problemsData.length === 0 ? (
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
              sx={{ minWidth: 700, borderRadius: '20px', overflow: 'hidden' }}
              aria-label='customized table'
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell align='right'>Acceptance</StyledTableCell>
                  <StyledTableCell align='right'>Difficulty</StyledTableCell>
                  <StyledTableCell align='right'>Practice</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {problemsData.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component='th' scope='row'>
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {' '}
                      {row.acceptance}%
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Chip
                        label={row.difficulty}
                        color={getChipColor(row.difficulty)}
                      />
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <Button
                        variant='contained'
                        sx={{ textTransform: 'none' }}
                        onClick={() => handleProblemSolve(row._id)}
                      >
                        Solve
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
}
