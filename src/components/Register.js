import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import AuthenticationService from '../service/AuthenticationService';

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

export default function SignUp() {

  const history = useNavigate();

  const [account, setAccount] = useState({
    accountno: '',
    password: '',
    transactionpassword: '',
    balance: 4000000,
    type: 'current'
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setAccount((prevAccount) => ({
        ...prevAccount,
        [parent]: {
          ...prevAccount[parent],
          [child]: value
        }
      }));
    } else {
      setAccount((prevAccount) => ({
        ...prevAccount,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    console.log(JSON.stringify(validationErrors, 4, 4));

    if (Object.keys(validationErrors).length === 0){
      try {
        await AuthenticationService.registerAccount(account);
        setSuccessMessage('Netbanking Registration successful!');
        alert("Netbanking Registration Successful");
        setTimeout(() => {
          history('/login');
        }, 3000)
      }
      catch (error) {
        console.error('Registration error', error);
        setSuccessMessage('An error occurred during netbanking registration.');
      }
    } else {
      console.log("Yoo");
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validateErrors = {};

    if(!account.accountno) {
      validateErrors.accountno = 'Account Number required.';
    }

    if(!account.password) {
      validateErrors.password = 'Password is required.';
    } else if (account.password.length < 6) {
      validateErrors.password = 'Password must be at least 6 characters.';
    }

    if(!account.transactionpassword) {
      validateErrors.transactionpassword = 'Transaction Password is required.';
    } else if (account.transactionpassword.length < 6) {
      validateErrors.transactionpassword = 'Transaction Password must be at least 6 characters.';
    }

    if(!account.balance) {
      validateErrors.balance = 'Account balance required.';
    }

    if(!account.type) {
      validateErrors.type = 'Account type required.';
    }

    return validateErrors;

  };

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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register for Netbanking
          </Typography>
          {successMessage && <p>{successMessage}</p>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="accountno"
                  label="Account Number"
                  name="accountno"
                  value={account.accountno}
                  onChange={handleChange}
                  // autoComplete="accountno"
                />
              </Grid>
              {errors.accountno && <p>{errors.accountno}</p>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={account.password}
                  onChange={handleChange}
                  // autoComplete="new-password"
                />
              </Grid>
              {errors.password && <p>{errors.password}</p>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="transactionpassword"
                  label="Transaction Password"
                  type="password"
                  id="transactionpassword"
                  value={account.transactionpassword}
                  onChange={handleChange}
                  // autoComplete="new-transaction-password"
                />
              </Grid>
              {errors.transactionpassword && <p>{errors.transactionpassword}</p>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="balance"
                  label="Account Balance"
                  id="balance"
                  value={account.balance}
                  onChange={handleChange}
                />
              </Grid>
              {errors.balance && <p>{errors.balance}</p>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="type"
                  label="Account type"
                  id="type"
                  value={account.type}
                  onChange={handleChange}
                />
              </Grid>
              {errors.type && <p>{errors.type}</p>}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label=""
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}