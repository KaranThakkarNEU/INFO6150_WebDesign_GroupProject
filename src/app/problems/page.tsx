'use client';

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
} from '@mui/material';
import { useRouter } from 'next/navigation';

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

const createData = (
  id: string,
  title: string,
  acceptance: number,
  difficulty: string
) => {
  {
    return { id, title, acceptance, difficulty };
  }
};

const rows = [
  createData('1', 'Frozen yoghurt', 24, 'Easy'),
  createData('2', 'Ice cream sandwich', 37, 'Hard'),
  createData('3', 'Eclair', 262, 'Medium'),
  createData('4', 'Cupcake', 305, 'Easy'),
  createData('5', 'Gingerbread', 356, 'Medium'),
];

export default function ProblemsPage() {
  const router = useRouter();

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
    <TableContainer
      component='div'
      sx={{ padding: '20px', boxShadow: '1px 9px 17px -3px rgba(0,0,0,0.7)' }}
    >
      <Table
        sx={{ minWidth: 700, borderRadius: '20px' }}
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
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
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
                  onClick={() => handleProblemSolve(row.id)}
                >
                  Solve
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
