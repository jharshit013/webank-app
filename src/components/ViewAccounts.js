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

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

import AdminService from '../service/AdminService';

export default function ViewAccounts() {

    
    const history = useNavigate();

    const [accounts, setAccounts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
      if(!AdminService.isAdminLoggedIn()){
        history('/admin');
    } else {
        fetchAccounts();
    }
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

    const editAccount = (accountno) => {
      history(`/accounts/${accountno}`);
    }

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
              <TableCell align="right">
                {/* <Button onClick={() => editAccount(acc.accountno)}>Edit</Button> */}
                <IconButton aria-label='edit' onClick={() => editAccount(acc.accountno)}><EditIcon /></IconButton>
                {/* <Button onClick={() => deleteAccount(acc.accountno)}>Delete</Button> */}
                <IconButton aria-label='delete' onClick={() => deleteAccount(acc.accountno)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
