import * as React from 'react';
import * as moment from 'moment'
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../service/AuthenticationService';
import AccountService from '../service/AccountService';

// import {getCurrentDate} from './utils'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        WeBank
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Transaction() {

  const history = useNavigate();

  const [fromacc, setFromacc] = useState('');
  const [toacc, setToacc] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionpassword, setTransactionpassword] = useState('');

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    AccountService.getAccountByNo(AuthenticationService.getLoggedInUsername()).then((response) => {
      const account = response.data;
      setFromacc(account.accountno);
    })
  }, []);

  const handleLogin = async () => {
    // if (!accountno || !password) {
    //   setErrorMessage('Please enter both email and password.');
    //   return;
    // }

    // const transaction = {
    //     // fromacc:this.fromacc,
    //     // toacc:this.toacc,
    //     // type:this.type,
    //     // date:new Date().toLocaleString(),
    //     // amount:this.amount,
    //     // transactionpassword:this.transactionpassword
    // };
    // transaction.fromacc=parseInt(fromacc);
    // transaction.toacc=parseInt(toacc);
    // transaction.type=type;
    // // transaction.date=(""+moment(new Date()).format('yyyy-MM-dd'));
    // transaction.date='2001-01-02';
    // transaction.amount=parseInt(amount);
    // transaction.transactionpassword=transactionpassword;

    // console.warn("deatils are ", transaction);
    // alert("deatils are ", transaction);

    // e.preventDefault();
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length === 0) {
    //   try {
    //     setTimeout(() => {
    //         alert("hi", transaction);
    //       }, 3000);
    //     // await AuthenticationService.transaction(this.transaction);
    //     try {
    //         const response = await axios.post('http://localhost:8086/webank/api/transaction', transaction);
    //         console.log('API response:', response.data + "Hello" + response.data.success);
    //         if (response.data === true) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     } catch (error) {
    //         console.error('Transaction error', error);
    //         throw new Error('An error occurred during Transaction');
    //     }
    //     setSuccessMessage('Transaction successful!');
    //     alert("Transaction Successfull");
        // setTimeout(() => {
        //   history('/transaction'); // navigates to Login Component
        // }, 3000);
      
    //   } 
      
    //   catch (error) {
    //     console.error('Transaction error', error);
    //     setSuccessMessage('An error occurred during Transaction.');
    //   }
    // } else {
    //   setErrors(validationErrors);
    // }

    try {
      const yourDate = new Date()
      const NewDate = moment(yourDate, 'YYYY-MM-DD')
        const response = await axios.post('http://localhost:8086/webank/api/transaction', 
        {
            fromacc:parseInt(fromacc),
            toacc:parseInt(toacc),
            type:type,
            date:''+NewDate,
            amount:parseInt(amount),
            transactionpassword:transactionpassword
        }
        );
        console.warn('API response:', response.data + "Hello" + response.data.success);
        alert("Transaction Successfull");
        if (response.data === true) {
            // alert("Transaction Successfull");
            return true;
        } else {
            // alert("Transaction Failed!");
            return false;
        }
    } catch (error) {
        alert("Transaction Failed");
        console.error('Transaction error', error);
        throw new Error('An error occurred during Transaction');
    }

  };


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AttachMoneyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Transaction
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fromacc"
              label="From Account"
              name="fromacc"
              value={fromacc}
              onChange={(e) => setFromacc(e.target.value)}
            //   autoComplete="fromacc"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="toacc"
              label="toacc"
              id="toacc"
              value={toacc}
              onChange={(e) => setToacc(e.target.value)}
            //   autoComplete="toacc"
            autoFocus
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="type"
              label="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            //   autoComplete="type"
            /> */}
            <InputLabel>Type</InputLabel>
            <Select
              margin="normal"
              required
              fullWidth
              value={type}
              label="Typee"
              name="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={"IMPS"}>IMPS</MenuItem>
              <MenuItem value={"NEFT"}>NEFT</MenuItem>
              <MenuItem value={"RTGS"}>RTGS</MenuItem>
            </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              name="amount"
              label="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            //   autoComplete="amount"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              name="transactionpassword"
              label="transactionpassword"
              id="transactionpassword"
              value={transactionpassword}
              onChange={(e) => setTransactionpassword(e.target.value)}
            //   autoComplete="amount"
            />
            <Button
              type="submit"
              onClick={handleLogin}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Details
            </Button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
  
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Transaction;