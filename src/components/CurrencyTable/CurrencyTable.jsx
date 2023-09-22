import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function CurrencyTable() {
  return (
    <div>
      <TableContainer
        sx={{
          backgroundColor: '#4A56E2',
          borderRadius: '30px',
          color: 'white',
          width: 336,
          height: 182,
        }}
      >
        <Table
         
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: 'white',
                opacity: 0.2,
                borderRadiusTop: '30px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <TableCell>Currency</TableCell>
              <TableCell>Purchase</TableCell>
              <TableCell>Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
