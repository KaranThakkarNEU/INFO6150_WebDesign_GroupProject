'use client';

import { VisibilityOff, Visibility, AccountCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const styles = {
  companyName: {
    textDecoration: 'underline',
  },
  loginGrid: {
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8EC5FC',
    backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
  },
  loginBox: {
    bgcolor: '#f8f8f8',
    height: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '30px',
    borderRadius: '10px',
  },
  signupBtn: {
    textTransform: 'none',
    maxWidth: '250px',
    width: '-webkit-fill-available',
    alignSelf: 'center',
    borderRadius: '20px',
    backgroundColor: '#0072ff',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  loginLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '15px',
    color: '#6d66ff',
    fontWeight: 'bold',
  },
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    minWidth: 320,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  resetBtn: {
    width: '50%',
    textTransform: 'none',
    margin: 'auto',
    display: 'flex',
    textWrap: 'nowrap',
  },
  wordDecor: {
    background:
      'radial-gradient(circle farthest-corner at bottom right, #121FCF 0%, #CF1512 100%)',
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
  },
};

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const SigninSchema = Yup.object().shape({
    firstName: Yup.string().required('This is a required field'),
    lastName: Yup.string().required('This is a required field'),
    email: Yup.string()
      .required('This is a required field')
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Enter valid email address'),
    password: Yup.string()
      .required('This is a required field')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
        'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character'
      ),
    confirmPassword: Yup.string()
      .required('This is a required field')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SigninSchema,
    onSubmit: (values, formikHelpers) => {
      console.log(values);
      formikHelpers.resetForm();
    },
  });

  return (
    <>
      <Grid
        container
        sx={{
          ...styles.loginGrid,
          flexDirection: { xs: 'row', sm: 'row', md: 'column' },
        }}
      >
        <Typography variant='h4' sx={{ margin: '0.67em' }}>
          Create your <span style={styles.wordDecor}>CODEAB</span> Account
        </Typography>
        <Container maxWidth='sm'>
          <Box
            component='form'
            sx={styles.loginBox}
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid
              container
              direction='row'
              justifyContent='flex-start'
              alignItems='flex-start'
              rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={12} sm={12} md={12}>
                <Link href='signin'>Sign in</Link>
              </Grid>

              <Grid xs={12} sm={6} md={6}>
                <FormControl
                  sx={{ m: 1, width: '-webkit-fill-available' }}
                  variant='outlined'
                >
                  <InputLabel htmlFor='firstName'>First Name</InputLabel>
                  <OutlinedInput
                    id='firstName'
                    label='FirstName'
                    fullWidth
                    value={values.firstName}
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    placeholder='Karan'
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                  {Boolean(touched.firstName) && errors.firstName ? (
                    <FormHelperText error>{errors.firstName}</FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>

              <Grid xs={12} sm={6} md={6}>
                <FormControl
                  sx={{ m: 1, width: '-webkit-fill-available' }}
                  variant='outlined'
                >
                  <InputLabel htmlFor='lastName'>Last Name</InputLabel>
                  <OutlinedInput
                    id='lastName'
                    label='Last Name'
                    fullWidth
                    value={values.lastName}
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    placeholder='Thakkar'
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                  {Boolean(touched.lastName) && errors.lastName ? (
                    <FormHelperText error>{errors.lastName}</FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>

              <Grid xs={12}>
                <FormControl
                  sx={{ m: 1, width: '-webkit-fill-available' }}
                  variant='outlined'
                >
                  <InputLabel htmlFor='email'>Email</InputLabel>
                  <OutlinedInput
                    id='email'
                    label='Email'
                    fullWidth
                    value={values.email}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    placeholder='karan@northeastern.edu'
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position='start'>
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                  {Boolean(touched.email) && errors.email ? (
                    <FormHelperText error>{errors.email}</FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>

              <Grid xs={12}>
                <FormControl
                  sx={{ m: 1, width: '-webkit-fill-available' }}
                  variant='outlined'
                >
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <OutlinedInput
                    id='password'
                    fullWidth
                    placeholder='Ilovecodeab123'
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position='start'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          edge='start'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                  {Boolean(touched.password) && errors.password ? (
                    <FormHelperText error id='password-error'>
                      {errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>

              <Grid xs={12}>
                <FormControl
                  sx={{ m: 1, width: '-webkit-fill-available' }}
                  variant='outlined'
                >
                  <InputLabel htmlFor='confirmPassword'>
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id='confirmPassword'
                    fullWidth
                    placeholder='Ilovecodeab123'
                    type={showPassword ? 'text' : 'password'}
                    value={values.confirmPassword}
                    error={
                      Boolean(touched.confirmPassword) &&
                      Boolean(errors.confirmPassword)
                    }
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position='start'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          edge='start'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Confirm Password'
                  />
                  {Boolean(touched.confirmPassword) &&
                  errors.confirmPassword ? (
                    <FormHelperText error id='confirmPassword-error'>
                      {errors.confirmPassword}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Grid>

              <Grid xs={12} sx={{ textAlign: 'center' }}>
                <Button variant='contained' sx={styles.signupBtn} type='submit'>
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </>
  );
}
