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

import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import AuthenticationService from '../service/AuthenticationService';
import AccountService from '../service/AccountService';
import AdminService from '../service/AdminService';

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

export default function EditAccount() {

  const history = useNavigate();

  const {accountno} = useParams()
  const [balance, setBalance] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if(!AdminService.isAdminLoggedIn()){
      history('/admin');
  } else {
    AccountService.getAccountByNo(accountno).then((response) => {
        const account = response.data;
        setBalance(account.balance);
        setType(account.type);
    });
  }
  }, [accountno]);

  const updateAccount = (e) => {
    e.preventDefault();
    const account = {balance, type};

    AccountService.updateAccount(account, accountno).then(() => {
        history('/accounts');
    });
  };

  const changeBalanceHandler = (e) => {
    setBalance(e.target.value);
  }

  const changeTypeHandler = (e) => {
    setType(e.target.value);
  }

  const cancel = () => {
    history('/accounts');
  }

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
            Update Account
          </Typography>
          <Box component="form" noValidate onSubmit={updateAccount} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="balance"
                  label="Balance"
                  type="balance"
                  value={balance}
                  onChange={changeBalanceHandler}
                  // autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="type"
                  label="Type"
                  type="type"
                  value={type}
                  onChange={changeTypeHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            <Button onClick={cancel.bind(this)}>Cancel</Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}