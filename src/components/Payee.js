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
import PaymentsIcon from '@mui/icons-material/Payments';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationService from '../service/AuthenticationService';

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

function Payee() {

  const history = useNavigate();
//   const [fromacc, setFromacc] = useState('');
//   const [toacc, setToacc] = useState('');
//   const [type, setType] = useState('');
//   const [date, setDate] = useState('');
//   const [amount, setAmount] = useState('');
//   const [transactionpassword, setTransactionpassword] = useState('');

    const [fromacc, setFromacc] = useState('');
    const [toacc, setToacc] = useState('');
    const [type, setType] = useState('');

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

  const [payerAccountNo, setPayerAccountNo] = useState('');
  const [payeeNickname, setPayeeNickname] = useState('');
  const [payeeAccountNo, setPayeeAccountNo] = useState('');

  const handleLogin = async () => {

    try {
      const yourDate = new Date()
      const NewDate = moment(yourDate, 'YYYY-MM-DD')
        const response = await axios.post('http://localhost:8086/webank/api/payee', 
        {
            payerAccountNo:parseInt(payerAccountNo),
            payeeNickname: payeeNickname,
            payeeAccountNo: parseInt(payeeAccountNo)
        }
        );
        console.warn('API response:', response.data + "Hello" + response.data.success);
        alert("Payee Added.");
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
            <PaymentsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Payee
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="payerAccountNo"
              label="payerAccountNo"
              name="payerAccountNo"
              value={payerAccountNo}
              onChange={(e) => setPayerAccountNo(e.target.value)}
            //   autoComplete="fromacc"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="payeeNickname"
              label="payeeNickname"
              id="payeeNickname"
              value={payeeNickname}
              onChange={(e) => setPayeeNickname(e.target.value)}
            //   autoComplete="toacc"
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
            //   type="number"
              name="payeeAccountNo"
              label="payeeAccountNo"
              id="payeeAccountNo"
              value={payeeAccountNo}
              onChange={(e) => setPayeeAccountNo(e.target.value)}
            //   autoComplete="amount"
            />
            
            <Button
              type="submit"
              onClick={handleLogin}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Payee
            </Button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/openaccount" variant="body2">
                  {"Or first apply for the account? Apply"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Payee;