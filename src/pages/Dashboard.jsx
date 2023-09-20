import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Image from '../assets/bg-dashboard.png';
import { Container } from '@mui/material';

export default function Dashboard() {
  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            backgroundColor: 'inherit',
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: 'white',
                borderRadius: '30px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category&nbsp;</TableCell>
              <TableCell>Comment&nbsp;</TableCell>
              <TableCell>Sum&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
