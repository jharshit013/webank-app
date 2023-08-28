import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import AccountService from '../service/AccountService';
import {useNavigate} from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {

    
    const history = useNavigate();

    const [accounts, setAccounts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = () => {
        AccountService.getAccounts().then((response) => {
            setAccounts(response.data);
        });
    };

    const deleteAccount = (accountno) => {
        AccountService.deleteAccount(accountno).then(() => {
            fetchAccounts();
            setMessage('Account deleted successfully');
            setTimeout(() => {
                setMessage('');
            }, 2000);
        });
    };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Actions</TableCell>
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell> */}
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((acc) => (
            <TableRow
              key={acc.accountid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {acc.accountid}
              </TableCell>
              <TableCell>{acc.accountno}</TableCell>
              <TableCell align="right">{acc.balance}</TableCell>
              <TableCell align="right">{acc.type}</TableCell>
              {/* <TableCell align="right">{acc.type}</TableCell> */}
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
