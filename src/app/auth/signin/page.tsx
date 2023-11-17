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
  Modal,
  OutlinedInput,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { auth } from '../../../../firebase/clientApp';
import ErrorComponent from '@/components/error';
import { ErrorProps } from '@/utility/models/error';
import { useRouter } from 'next/navigation';
import ProtectedRouteComponent from '@/components/protectedRouter';

const styles = {
  companyName: {
    background:
      'radial-gradient(circle farthest-corner at bottom right, #121FCF 0%, #CF1512 100%)',
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    fontSize: '2rem',
  },
  signupGrid: {
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
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
  loginBtn: {
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
};

export default function SignInPage() {
  const router = useRouter();
  const [alertMsg, setAlertMsg] = useState<ErrorProps>({
    isActive: false,
    message: '',
    type: 'success',
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const handleForgotPasswordOpen = () => setOpenForgotPassword(true);
  const handleForgotPasswordClose = () => setOpenForgotPassword(false);

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .required('This is a required field')
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Enter valid email address'),
    password: Yup.string()
      .required('This is a required field')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
        'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character'
      ),
  });

  const forgotPasswordSchema = Yup.object().shape({
    forgotPassword: Yup.string()
      .required('This is a required field')
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Enter valid email address'),
  });

  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SigninSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await auth.signInWithEmailAndPassword(values.email, values.password);

        setAlertMsg({
          isActive: true,
          message: 'Login succesful',
          type: 'success',
        });
        clearAlertMsg();
        formikHelpers.resetForm();
        router.push('/');
      } catch (error: any) {
        if (error.message.includes('invalid-login-credentials')) {
          setAlertMsg({
            isActive: true,
            message: 'Invalid login credentials',
            type: 'error',
          });
        }
        clearAlertMsg();
      }
    },
  });

  const {
    values: fpValues,
    errors: fpErrors,
    handleChange: fpHandleChange,
    handleSubmit: fpHandleSubmit,
    touched: fpTouched,
  } = useFormik({
    initialValues: {
      forgotPassword: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, formikHelpers) => {
      formikHelpers.resetForm();
    },
  });

  const clearAlertMsg = () => {
    setTimeout(() => {
      setAlertMsg({
        isActive: false,
        message: '',
        type: 'success',
      });
    }, 3000);
  };

  return (
    <ProtectedRouteComponent>
      {alertMsg.isActive ? (
        <ErrorComponent message={alertMsg.message} type={alertMsg.type} />
      ) : null}
      <Grid container xs={12} sx={styles.signupGrid}>
        <h2 style={styles.companyName}>CODEAB</h2>
        <Typography variant='h4' sx={{ margin: '0.67em' }}>
          Good to see you again
        </Typography>
        <Container maxWidth='sm'>
          <Box
            component='form'
            sx={styles.loginBox}
            noValidate
            onSubmit={handleSubmit}
          >
            <FormControl sx={{ m: 1 }} variant='outlined'>
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
            <FormControl sx={{ m: 1 }} variant='outlined'>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <OutlinedInput
                id='password'
                fullWidth
                placeholder='Ilovecodeab123'
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
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
            <Button variant='contained' sx={styles.loginBtn} type='submit'>
              Sign in
            </Button>
            <Box sx={styles.loginLinks}>
              <Button variant='outlined' href='signup'>
                Don&rsquo;t have an account?
              </Button>
              <Button onClick={handleForgotPasswordOpen}>
                Forgot password?
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>

      <Modal
        open={openForgotPassword}
        onClose={handleForgotPasswordClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={styles.modal}
          component='form'
          noValidate
          onSubmit={fpHandleSubmit}
        >
          <Typography variant='h6'>
            If you have forgotten your password you can reset it here.
          </Typography>
          <FormControl sx={{ m: 1, display: 'block' }} variant='outlined'>
            <InputLabel htmlFor='forgotPassword'>Email</InputLabel>
            <OutlinedInput
              id='forgotPassword'
              label='Email'
              fullWidth
              value={fpValues.forgotPassword}
              error={
                Boolean(fpTouched.forgotPassword) &&
                Boolean(fpErrors.forgotPassword)
              }
              placeholder='karan@northeastern.edu'
              onChange={fpHandleChange}
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
            />
            {Boolean(fpTouched.forgotPassword) && fpErrors.forgotPassword ? (
              <FormHelperText error>{fpErrors.forgotPassword}</FormHelperText>
            ) : null}
          </FormControl>
          <Button sx={styles.resetBtn} variant='outlined' type='submit'>
            Reset Password
          </Button>
        </Box>
      </Modal>
    </ProtectedRouteComponent>
  );
}
