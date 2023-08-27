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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccountBalance } from '@mui/icons-material';

import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import AuthenticationService from '../service/AuthenticationService';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function OpenAccount() {

  const history = useNavigate();

  const [customer, setCustomer] = useState({
    title: '',
    fname: '',
    mname: '',
    lname: '',
    fathername: '',
    mobileno: '',
    email: '',
    aadharno: '',
    dob: '',
    address: {
      line1: '',
      line2: '',
      landmark: '',
      state: '',
      city: '',
      pincode: ''
    },
    occupation: {
      type: '',
      sourceofincome: '',
      grossannualincome: ''
    }
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
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [parent]: {
          ...prevCustomer[parent],
          [child]: value
        }
      }));
    } else {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await AuthenticationService.registerCustomer(customer);
        setSuccessMessage('Applied successfully!');
        alert("Applied Successfull");
        setTimeout(() => {
          history('/register'); // navigates to Login Component
        }, 3000);
      
      } 
      
      catch (error) {
        console.error('Submission error', error);
        setSuccessMessage('An error occurred during form submisssion.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let validateErrors = {};
    if(!customer.title){
      validateErrors.title = 'Title is required.';
    }

    if(!customer.fname){
      validateErrors.fname = 'First Name is required.';
    } else if (!/^[a-zA-Z]*$/.test(customer.fname)) {
      validateErrors.fname = 'Enter Alphabets only';
    }

    if(!customer.mname){
      validateErrors.fname = 'Middle Name is required.';
    } else if (!/^[a-zA-Z]*$/.test(customer.mname)) {
      validateErrors.mname = 'Enter Alphabets only';
    }

    if(!customer.lname){
      validateErrors.fname = 'Last Name is required.';
    } else if (!/^[a-zA-Z]*$/.test(customer.lname)) {
      validateErrors.lname = 'Enter Alphabets only';
    }

    if(!customer.fathername){
      validateErrors.fathername = 'Father\'s Name is required.';
    } else if (!/^[a-zA-Z]*$/.test(customer.fathername)) {
      validateErrors.fathername = 'Enter Alphabets only';
    }

    if(!customer.email){
      validateErrors.email = 'Email iis required.'
    }

    if(!customer.dob){
      validateErrors.dob = 'Dat of Birth is required';
    }

    if (!customer.mobileno) {
      validateErrors.mobileno = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(customer.mobileno)) {
      validateErrors.mobileno = 'Invalid mobile number. Please enter a 10-digit number.';
    }

    if (!customer.aadharno) {
      validateErrors.aadharno = 'Aadhar number is required.';
    } else if (!/^\d{12}$/.test(customer.aadharno)) {
      validateErrors.aadharno = 'Invalid aadhaar number. Please enter a 12-digit number.';
    }
    
    if(!customer.address.line1){
      validateErrors['address.line1'] = 'Line1 is required.';
    }

    if(!customer.address.line2){
      validateErrors['address.line2'] = 'Line2 is required.';
    }

    if(!customer.address.landmark){
      validateErrors['address.landmark'] = 'Landmark is required.';
    }

    if(!customer.address.state){
      validateErrors['address.state'] = 'State is required.';
    }

    if(!customer.address.city){
      validateErrors['address.city'] = 'City is required.';
    }

    if(!customer.address.pincode){
      validateErrors['address.pincode'] = 'Pincode is required.';
    }

    if(!customer.occupation.type){
      validateErrors['occupation.type'] = 'Occuptaion Type is required.';
    }

    if(!customer.occupation.sourceofincome){
      validateErrors['occupation.sourceofincome'] = 'Source of Income is required.';
    }

    if(!customer.occupation.grossannualincome){
      validateErrors['occupation.grossannualincome'] = 'Gross Annual Income is required.';
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
            <AccountBalance />
          </Avatar>
          <Typography component="h1" variant="h5">
            Apply for Account
          </Typography>
          {successMessage && <p>{successMessage}</p>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Typography component="h2">Personal Details</Typography> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={customer.title}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              {errors.title && <p>{errors.title}</p>}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={customer.fname}
                  onChange={handleChange}
                />
              </Grid>
              {errors.fname && <p>{errors.fname}</p>}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  name="mname"
                  value={customer.mname}
                  onChange={handleChange}
                />
              </Grid>
              {errors.mname && <p>{errors.mname}</p>}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lname"
                  value={customer.lname}
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              {errors.lname && <p>{errors.lname}</p>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fatherName"
                  label="Father's Name"
                  name="fathername"
                  value={customer.fathername}
                  onChange={handleChange}
                />
              </Grid>
              {errors.fathername && <p>{errors.fathername}</p>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobileNo"
                  label="Mobile Number"
                  name="mobileno"
                  value={customer.mobileno}
                  onChange={handleChange}
                />
              </Grid>
              {errors.mobileno && <p>{errors.mobileno}</p>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={customer.email}
                  onChange={handleChange}
                />
              </Grid>
              {errors.email && <p>{errors.email}</p>}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="aadharNo"
                  label="Aadhar Card Number"
                  name="aadharno"
                  value={customer.aadharno}
                  onChange={handleChange}
                />
              </Grid>
              {errors.aadharno && <p>{errors.aadharno}</p>}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={customer.dob}
                  onChange={handleChange}
                />
              </Grid>
              {errors.dob && <p>{errors.dob}</p>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="line1"
                  label="Address Line 1"
                  name="address.line1"
                  value={customer.address.line1}
                  onChange={handleChange}
                />
              </Grid>
              {errors['address.line1'] && <p>{errors['address.line1']}</p>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="line2"
                  label="Address Line 2"
                  name="address.line2"
                  value={customer.address.line2}
                  onChange={handleChange}
                />
              </Grid>
              {errors['address.line2'] && <p>{errors['address.line2']}</p>}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="landmark"
                  label="Landmark"
                  name="address.landmark"
                  value={customer.address.landmark}
                  onChange={handleChange}
                />
              </Grid>
              {errors['address.landmark'] && <p>{errors['address.landmark']}</p>}
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="address.state"
                  value={customer.address.state}
                  onChange={handleChange}
                />
              </Grid>
              {errors['address.state'] && <p>{errors['address.state']}</p>}
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="address.city"
                  value={customer.address.city}
                  onChange={handleChange}
                />
              </Grid>
              {errors['address.city'] && <p>{errors['address.city']}</p>}
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="pincode"
                  label="Pincode"
                  name="address.pincode"
                  value={customer.address.pincode}
                  onChange={handleChange}
                />
              </Grid>
              {errors['address.pincode'] && <p>{errors['address.pincode']}</p>}
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="occType"
                  label="Occupation Type"
                  name="occupation.type"
                  value={customer.occupation.type}
                  onChange={handleChange}
                />
              </Grid>
              {errors['occupation.type'] && <p>{errors['occupation.type']}</p>}
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="soi"
                  label="Source of Income"
                  name="occupation.sourceofincome"
                  value={customer.occupation.sourceofincome}
                  onChange={handleChange}
                />
              </Grid>
              {errors['occupation.sourceofincome'] && <p>{errors['occupation.sourceofincome']}</p>}
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="gai"
                  label="Gross Annual Income"
                  name="occupation.grossannualincome"
                  value={customer.occupation.grossannualincome}
                  onChange={handleChange}
                />
              </Grid>
              {errors['occupation.grossannualincome'] && <p>{errors['occupation.grossannualincome']}</p>}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Apply
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Already applied? Register with Netbanking
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