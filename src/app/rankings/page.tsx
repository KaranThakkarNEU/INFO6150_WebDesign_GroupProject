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
} from '@mui/material';

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
  name: string,
  noOfProblemsSolved: number,
  country: string
) => {
  {
    return { name, noOfProblemsSolved, country };
  }
};

const rows = [
  createData('Karan', 20, 'India'),
  createData('Adwait', 10, 'China'),
  createData('Niyati', 8, 'USA'),
  createData('Dipti', 5, 'India'),
  createData('Random', 1, 'India'),
];

export default function RankingsPage() {
  return (
    <TableContainer
      component='div'
      sx={{ padding: '20px', boxShadow: '1px 9px 17px -3px rgba(0,0,0,0.7)' }}
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
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component='th' scope='row'>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {row.noOfProblemsSolved}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.country}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
