import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from '../../assets/images/bg-dashboard.png';
import { Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import CurrencyTable from '../../components/CurrencyTable/CurrencyTable'
import ButtonsDashboard from '../../components/ButtonDashboard/ButtonDashboard';
import Balance from '../../components/Balance/Balance';

export default function Dashboard() {
  const mobile = useMediaQuery('(min-width:320px)');
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
      <CurrencyTable></CurrencyTable>
      <Balance></Balance>
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

              <ButtonsDashboard></ButtonsDashboard>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
